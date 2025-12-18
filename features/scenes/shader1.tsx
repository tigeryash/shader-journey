import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { extend, useThree } from "@react-three/fiber";
import { Fn, vec3, abs, length, clamp, uv, mix } from "three/tsl";
import { MeshBasicNodeMaterial } from "three/webgpu";

extend({ MeshBasicNodeMaterial });

export default function Shader1() {
	const { scene, gl } = useThree();

	const { nodes } = useMemo(() => {
		const gradientNode = Fn(() => {
			const color1 = vec3(0.01, 0.22, 0.98);
			const color2 = vec3(0.36, 0.68, 1.0);
			const t = clamp(length(abs(uv().sub(0.5))), 0.0, 0.8);
			return mix(color1, color2, t);
		});

		const sphereColorNode = gradientNode();

		return {
			nodes: {
				sphereColorNode,
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
