import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { extend, useThree } from "@react-three/fiber";
import { Fn, vec3, abs, length, clamp, uv, mix, uniform } from "three/tsl";
import { MeshBasicNodeMaterial } from "three/webgpu";

extend({ MeshBasicNodeMaterial });

export default function Shader1() {
	const { scene, gl } = useThree();

	const { nodes, uniforms } = useMemo(() => {
		const time = uniform(0);

		const positionNode = Fn(() => {});

		const normalNode = Fn(() => {});

		return {
			nodes: {
				positionNode,
				normalNode,
			},
			uniforms: {
				time,
			},
		};
	}, []);

	return (
		<>
			<directionalLight position={[10, 10, 10]} intensity={4.0} />{" "}
			<mesh>
				<sphereGeometry args={[50, 16, 16]} />
				{/* @ts-ignore */}
				<meshBasicNodeMaterial
					colorNode={nodes.sphereColorNode}
					side={THREE.BackSide}
				/>
			</mesh>
			<mesh>
				<sphereGeometry args={[1, 256]} />
				<meshStandardMaterial color="white" />
			</mesh>
		</>
	);
}
