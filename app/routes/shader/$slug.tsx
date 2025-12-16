import { Navigate, useParams } from "react-router";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { shaders } from "../../../features/registry";
import { OrbitControls } from "@react-three/drei";
import { Leva } from "leva";
import { WebGPURenderer } from "three/webgpu";
import ShaderLoading from "components/shader-loading";

function Background({ color = "#000" }: { color?: string }) {
  return <color attach="background" args={[color]} />;
}

export default function ShaderRoute() {
  const { slug } = useParams();
  const entry = slug ? shaders[slug] : undefined;
  if (!entry) return <Navigate to="/shader" replace />;
  const [frameloop, setFrameloop] =  useState<("never" | "always")>("never");

  const Scene = entry.component;
  const bg = entry.canvas?.background ?? "#000";
  const dpr = entry.canvas?.dpr ?? [1, Math.min(2, window.devicePixelRatio)];
  const camera = entry.canvas?.camera ?? {
    fov: 45,
    position: [0, 0, 20] as [number, number, number],
  };

  // Optional: pause rendering when tab hidden
  useEffect(() => {
    const onVis = () => {
      // you can set state to control frameloop if you want; keeping simple here
      if (document.hidden) {
        setFrameloop("never");
      } else {
        setFrameloop("always");
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas dpr={dpr} 
          frameloop={frameloop}
          style={{ width: "100%", height: "100vh" }}
          gl={async (props) => {
            const renderer = new WebGPURenderer({
              canvas: props.canvas as HTMLCanvasElement,
              powerPreference: "high-performance",
              antialias: true,
              alpha: false,
              stencil: false,
          });

          await renderer.init();
          setFrameloop("always");
          return renderer;
        }}
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
        }}>
        <ambientLight intensity={1} />
        <OrbitControls />

        <Background color={bg} />
        <Suspense fallback={<ShaderLoading />}>
          <Scene />
        </Suspense>
      </Canvas>
      <Leva collapsed />
    </div>
  );
}
