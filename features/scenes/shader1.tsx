import vertex from "../shaders/shader1/vertex.glsl";
import fragment from "../shaders/shader1/fragment.glsl";
import CustomShaderMaterial from "three-custom-shader-material";
import * as THREE from "three";

export default function Shader1() {
  return (
    <mesh>
      <CustomShaderMaterial
        baseMaterial={THREE.MeshStandardMaterial}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
      />
      <planeGeometry args={[1, 1, 32, 32]} />
    </mesh>
  );
}
