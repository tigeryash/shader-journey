import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
	vec3,
	uniform,
	varying,
	sin,
	positionLocal,
	attribute,
	Fn,
	texture,
	uv,
} from "three/tsl";
import { MeshStandardNodeMaterial } from "three/webgpu";
import { useControls } from "leva";

extend({ MeshStandardNodeMaterial });

export default function Shader1() {
	const { scene, gl } = useThree();

	const flagTexture = useLoader(THREE.TextureLoader, "/usflag.png");

	const { position, frequency } = useControls({
		position: { value: [0, 0, 0], step: 0.1 },
		frequency: { value: [10, 5], step: 0.1 },
		amplitude: { value: 0.1, step: 0.1 },
	});

	const geometry = useMemo(() => {
		const geo = new THREE.PlaneGeometry(1, 1, 32, 32);
		const count = geo.attributes.position.count; // Number of vertices
		const aCountArray = new Float32Array(count);

		// Fill with random values (one per vertex)
		for (let i = 0; i < count; i++) {
			aCountArray[i] = Math.random();
		}

		// Add the attribute to the geometry
		geo.setAttribute("aCount", new THREE.BufferAttribute(aCountArray, 1));
		return geo;
	}, []);

	const { nodes, uniforms } = useMemo(() => {
		const uTime = uniform(0);
		const vNormal = varying(vec3(), "vNormal");
		const uPosition = uniform(new THREE.Vector3(0, 0, 0));
		const aCount = attribute("aCount");
		const uFrequency = uniform(new THREE.Vector2(10, 5));
		const uTexture = texture(flagTexture, uv());
		const uAmplitude = uniform(0.1);

		// Transform local position by model matrix (same as modelMatrix * vec4(position, 1.0))
		// const zOffset = sin(positionLocal.x.mul(10)).mul(0.1);

		// Create new position by constructing a new vec3 (no assignment needed)
		// const modifiedPosition = vec3(
		// 	positionLocal.x,
		// 	positionLocal.y,
		// 	positionLocal.z.add(zOffset),
		// );

		// const modifiedPosition = vec3(
		// 	positionLocal.x,
		// 	positionLocal.y,
		// 	positionLocal.z.add(aCount.mul(0.1)),
		// );

		const getElevation = Fn(() => {
			let elevation = sin(positionLocal.x.mul(uFrequency.x).sub(uTime)).mul(
				uAmplitude,
			);
			elevation.addAssign(
				sin(positionLocal.y.mul(uFrequency.y).sub(uTime)).mul(uAmplitude),
			);

			let textureColor = uTexture;
			textureColor.rgb.mulAssign(elevation.mul(2).add(0.5));
			return textureColor;
		});

		const modifiedPosition = Fn(() => {
			const pos = positionLocal.toVar();
			const zOffsetY = sin(pos.y.mul(uFrequency.y).sub(uTime)).mul(uAmplitude);
			const zOffsetX = sin(pos.x.mul(uFrequency.x).sub(uTime)).mul(uAmplitude);
			pos.z.addAssign(zOffsetX.add(zOffsetY));

			return pos;
		})();
		const normalNode = vNormal;

		// const colorNode = vec4(0.5, aCount, 1, 1);
		const colorNode = getElevation();

		return {
			nodes: {
				positionNode: modifiedPosition,
				normalNode,
				colorNode,
			},
			uniforms: {
				uTime,
				uPosition,
				uFrequency,
			},
		};
	}, [flagTexture]);

	useEffect(() => {
		uniforms.uPosition.value.set(...position);
		uniforms.uFrequency.value.set(...frequency);
	}, [uniforms.uPosition, position, uniforms.uFrequency, frequency]);

	useFrame((state) => {
		const { clock } = state;

		uniforms.uTime.value = clock.getElapsedTime();
	});

	return (
		<>
			<directionalLight position={[10, 10, 10]} intensity={4.0} />{" "}
			<mesh position={[0, 0, 0]} geometry={geometry} scale={[1, 2 / 3, 1]}>
				{/* @ts-ignore */}
				<meshStandardNodeMaterial
					side={THREE.DoubleSide}
					positionNode={nodes.positionNode}
					colorNode={nodes.colorNode}
				/>
			</mesh>
		</>
	);
}
