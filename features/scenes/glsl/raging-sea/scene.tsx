import { useControls } from "leva"
import vertexShader from "../../../shaders/glsl/raging-sea/vertex.glsl"
import fragmentShader from "../../../shaders/glsl/raging-sea/fragment.glsl"
import { useMemo } from "react"
import * as THREE from "three"

const RagingSea = () => {
  const {
    uBigWavesElevation, 
    uBigWavesFrequency,
    uBigWavesSpeed,
    uDepthColor,
    uSurfaceColor,
    uColorOffset,
    uColorMultiplier,
    uSmallWavesIteration,
    uSmallWavesFrequency,
    uSmallWavesElevation,
    uSmallWavesSpeed,

  } = useControls({
    uBigWavesElevation: { value: 0.2, min: 0, max: 1, step: 0.001 },
    uBigWavesFrequency: { value: [4, 1.5], min: 0, max: 10, step: 0.001 },
    uBigWavesSpeed: { value: 0.75, min: 0, max: 4, step: 0.001 },
    uDepthColor: "#186691",
    uSurfaceColor: "#9bd8ff",
    uColorOffset: { value: 0.08, min: 0, max: 1, step: 0.001 },
    uColorMultiplier: { value: 5, min: 0, max: 10, step: 0.001 },
    uSmallWavesIteration: { value: 4, min: 0, max: 5, step: 1 },
    uSmallWavesFrequency:{ value: 0.25, min: 0, max: 30, step: 0.001 },
    uSmallWavesElevation:{ value: 0.15, min: 0, max: 1, step: 0.001 },
    uSmallWavesSpeed:{ value: 0.2, min: 0, max: 4, step: 0.001 },
  })

  const uniforms = useMemo(
    () => ({
      uBigWavesElevation: { value: uBigWavesElevation },
      uBigWavesFrequency: { value: new THREE.Vector2(...uBigWavesFrequency) }, // if [x, y]
      uBigWavesSpeed: { value: uBigWavesSpeed },

      uDepthColor: { value: new THREE.Color(uDepthColor) },     // if hex string
      uSurfaceColor: { value: new THREE.Color(uSurfaceColor) }, // if hex string
      uColorOffset: { value: uColorOffset },
      uColorMultiplier: { value: uColorMultiplier },

      uSmallWavesIteration: { value: uSmallWavesIteration },
      uSmallWavesFrequency: { value: uSmallWavesFrequency },
      uSmallWavesElevation: { value: uSmallWavesElevation },
      uSmallWavesSpeed: { value: uSmallWavesSpeed },
    }),
    [
      uBigWavesElevation,
      uBigWavesFrequency,
      uBigWavesSpeed,
      uDepthColor,
      uSurfaceColor,
      uColorOffset,
      uColorMultiplier,
      uSmallWavesIteration,
      uSmallWavesFrequency,
      uSmallWavesElevation,
      uSmallWavesSpeed,
    ]
  )

  return (
    <>
      <mesh rotation={[0, -Math.PI*.5, 0]}>
        <planeGeometry args={[2, 2, 512, 512]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
         
      
      </mesh>
    </>
  )
}

export default RagingSea