import * as THREE from "three";
import { useMemo, useRef } from "react";
import { extend,  useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useTexture } from "@react-three/drei";
import { 
  uniform,
  texture,
  positionLocal,
  sin,
  vec3,
  vec2,
  mix,
  smoothstep,
  uv
} from 'three/tsl';
import { MeshBasicNodeMaterial } from "three/webgpu";


extend({ MeshBasicNodeMaterial });


export default function Shader1() {
  const materialRef = useRef<any>(null);
  const noiseTexture = useTexture("/noiseTexture.png");
  noiseTexture.wrapS = THREE.RepeatWrapping;
  noiseTexture.wrapT = THREE.RepeatWrapping;
 
  
  const controls = useControls("Shader Controls", {
    waveSpeed: { value: { x: 0.029, y: 0.04 }, min: 0, max: 1, step: 0.01 },
    waveAmplitude: { value: 0.67, min: 0, max: 2, step: 0.01 },
    waveFrequency: { value: 1.81, min: 0, max: 10, step: 0.01 },
    color1: { value: "#ff6b35" },
    color2: { value: "#004e89" },
    color3: { value: "#1a1a1a" },
    color4: { value: "#f0f3bd" },
    color5: { value: "#00bbf9" },
    wireframe: { value: false },
  });

  // Create TSL uniforms
const timeUniform = useMemo(() => uniform(0), []);
  const waveAmplitudeUniform = useMemo(() => uniform(controls.waveAmplitude), []);
  const waveFrequencyUniform = useMemo(() => uniform(controls.waveFrequency), []);
  const waveSpeedUniform = useMemo(() => uniform(vec2(controls.waveSpeed.x, controls.waveSpeed.y)), []);
  
  const color1Uniform = useMemo(() => uniform(new THREE.Color(controls.color1)), []);
  const color2Uniform = useMemo(() => uniform(new THREE.Color(controls.color2)), []);
  const color3Uniform = useMemo(() => uniform(new THREE.Color(controls.color3)), []);
  const color4Uniform = useMemo(() => uniform(new THREE.Color(controls.color4)), []);
  const color5Uniform = useMemo(() => uniform(new THREE.Color(controls.color5)), []);
  
  const noiseTextureNode = useMemo(() => texture(noiseTexture), [noiseTexture]);

  // Position displacement - wrapped in useMemo
  const { newPosition, finalColor } = useMemo(() => {
    const animatedUV = uv().add(waveSpeedUniform.mul(timeUniform));
    const noise = noiseTextureNode.sample(animatedUV).r;
    const wave = sin(positionLocal.x.mul(waveFrequencyUniform).add(timeUniform));
    const displacement = wave.mul(waveAmplitudeUniform).mul(noise);
    const newPosition = positionLocal.add(vec3(0, 0, displacement));

    // Color mixing
    const mixFactor = noise.mul(wave.add(1).mul(0.5));
    const color1to2 = mix(color1Uniform, color2Uniform, smoothstep(0, 0.25, mixFactor));
    const color2to3 = mix(color1to2, color3Uniform, smoothstep(0.25, 0.5, mixFactor));
    const color3to4 = mix(color2to3, color4Uniform, smoothstep(0.5, 0.75, mixFactor));
    const finalColor = mix(color3to4, color5Uniform, smoothstep(0.75, 1, mixFactor));

    return { newPosition, finalColor };
  }, [timeUniform, waveAmplitudeUniform, waveFrequencyUniform, waveSpeedUniform, 
      color1Uniform, color2Uniform, color3Uniform, color4Uniform, color5Uniform, 
      noiseTextureNode]);

  useFrame((state) => {
    timeUniform.value = state.clock.elapsedTime;
    waveAmplitudeUniform.value = controls.waveAmplitude;
    waveFrequencyUniform.value = controls.waveFrequency;
    waveSpeedUniform.value.set(controls.waveSpeed.x, controls.waveSpeed.y);
    color1Uniform.value.set(controls.color1);
    color2Uniform.value.set(controls.color2);
    color3Uniform.value.set(controls.color3);
    color4Uniform.value.set(controls.color4);
    color5Uniform.value.set(controls.color5);
  });

  return (
    <mesh>
      <planeGeometry args={[10, 10, 180, 180]} />
      {/* @ts-ignore */}
      <meshBasicNodeMaterial
        ref={materialRef}
        wireframe={controls.wireframe}
        side={THREE.DoubleSide}
        positionNode={newPosition}
        colorNode={finalColor}
      />
    </mesh>
  );
}
