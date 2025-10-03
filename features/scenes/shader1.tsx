import vertex from "../shaders/shader1/vertex.glsl";
import fragment from "../shaders/shader1/fragment.glsl";
import CustomShaderMaterial from "three-custom-shader-material";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

export default function Shader1() {
  const materialRef = useRef<any>(null);

  const handleChange = (value: number | string, uniformName: string) => {
    if (materialRef.current?.uniforms) {
      materialRef.current.uniforms[uniformName].value = value;
    }
  };

  useControls("Shader Controls", {
    waveAmplitude: {
      value: 0.77,
      onChange: (value) => handleChange(value, "u_waveAmplitude"),
      min: 0,
      max: 2,
      step: 0.01,
    },
    waveFrequency: {
      value: 1.36,
      onChange: (value) => handleChange(value, "u_waveFrequency"),
      min: 0,
      max: 10,
      step: 0.01,
    },
    color1: {
      value: "#ff6b35",
      onChange: (value) => handleChange(value, "u_color1"),
    },
    color2: {
      value: "#004e89",
      onChange: (value) => handleChange(value, "u_color2"),
    },
    color3: {
      value: "#1a1a1a",
      onChange: (value) => handleChange(value, "u_color3"),
    },
    color4: {
      value: "#f0f3bd",
      onChange: (value) => handleChange(value, "u_color4"),
    },
    color5: {
      value: "#00bbf9",
      onChange: (value) => handleChange(value, "u_color5"),
    },
  });

  useFrame((state) => {
    if (materialRef.current?.uniforms) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });
  return (
    <mesh>
      <planeGeometry args={[10, 10, 200, 200]} />

      <CustomShaderMaterial
        wireframe
        baseMaterial={THREE.MeshStandardMaterial}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
        uniforms={{
          u_time: { value: 0 },
          u_waveAmplitude: { value: 0.5 },
          u_waveFrequency: { value: 2.0 },
          u_color1: { value: new THREE.Color("#ff6b35") },
          u_color2: { value: new THREE.Color("#004e89") },
          u_color3: { value: new THREE.Color("#1a1a1a") },
          u_color4: { value: new THREE.Color("#f0f3bd") },
          u_color5: { value: new THREE.Color("#00bbf9") },
        }}
        ref={materialRef}
      />
    </mesh>
  );
}
