import vertex from "../shaders/shader1/vertex.glsl";
import fragment from "../shaders/shader1/fragment.glsl";
import CustomShaderMaterial from "three-custom-shader-material";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useTexture } from "@react-three/drei";

export default function Shader1() {
  const materialRef = useRef<any>(null);
  const noiseTexture = useTexture("/noiseTexture.png");
  noiseTexture.wrapS = THREE.RepeatWrapping;
  noiseTexture.wrapT = THREE.RepeatWrapping;
  noiseTexture.minFilter = THREE.LinearFilter;
  noiseTexture.magFilter = THREE.LinearFilter;

  const handleWaveChange = (value: number, uniformName: string) => {
    if (materialRef.current?.uniforms) {
      materialRef.current.uniforms[uniformName].value = value;
    }
  };

  const handleColorChange = (value: string, uniformName: string) => {
    if (materialRef.current?.uniforms) {
      materialRef.current.uniforms[uniformName].value = new THREE.Color(value);
    }
  };

  useControls("Shader Controls", {
    waveSpeed: {
      value: { x: 0.029, y: 0.04 },
      onChange: (value) => handleWaveChange(value, "u_waveSpeed"),
      min: 0,
      max: 1,
      step: 0.01,
    },
    waveAmplitude: {
      value: 0.67,
      onChange: (value) => handleWaveChange(value, "u_waveAmplitude"),
      min: 0,
      max: 2,
      step: 0.01,
    },
    waveFrequency: {
      value: 1.81,
      onChange: (value) => handleWaveChange(value, "u_waveFrequency"),
      min: 0,
      max: 10,
      step: 0.01,
    },
    color1: {
      value: "#ff6b35",
      onChange: (value) => handleColorChange(value, "u_color1"),
    },
    color2: {
      value: "#004e89",
      onChange: (value) => handleColorChange(value, "u_color2"),
    },
    color3: {
      value: "#1a1a1a",
      onChange: (value) => handleColorChange(value, "u_color3"),
    },
    color4: {
      value: "#f0f3bd",
      onChange: (value) => handleColorChange(value, "u_color4"),
    },
    color5: {
      value: "#00bbf9",
      onChange: (value) => handleColorChange(value, "u_color5"),
    },
    wireframe: {
      value: false,
      label: "Wireframe",
      onChange: (value) => {
        if (materialRef.current) {
          materialRef.current.wireframe = value;
        }
      },
    },
  });

  useFrame((state) => {
    if (materialRef.current?.uniforms) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });
  return (
    <mesh>
      <planeGeometry args={[10, 10, 180, 180]} />

      <CustomShaderMaterial
        wireframe={materialRef.current?.wireframe || false}
        baseMaterial={THREE.MeshStandardMaterial}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
        uniforms={{
          u_time: { value: 0 },
          u_waveAmplitude: { value: 0.5 },
          u_waveFrequency: { value: 2.0 },
          u_noiseTexture: { value: noiseTexture },
          u_color1: { value: new THREE.Color("#ff6b35") },
          u_color2: { value: new THREE.Color("#004e89") },
          u_color3: { value: new THREE.Color("#1a1a1a") },
          u_color4: { value: new THREE.Color("#f0f3bd") },
          u_color5: { value: new THREE.Color("#00bbf9") },
          u_waveSpeed: { value: { x: 0.1, y: 0.1 } },
        }}
        ref={materialRef}
      />
    </mesh>
  );
}
