import { Navigate, useParams } from "react-router";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { shaders } from "../../../features/registry";
import { OrbitControls } from "@react-three/drei";

function Background({ color = "#000" }: { color?: string }) {
  return <color attach="background" args={[color]} />;
}

export default function ShaderRoute() {
  const { slug } = useParams();
  const entry = slug ? shaders[slug] : undefined;
  if (!entry) return <Navigate to="/shader" replace />;

  const Scene = entry.component;
  const bg = entry.canvas?.background ?? "#000";
  const dpr = entry.canvas?.dpr ?? [1, Math.min(2, window.devicePixelRatio)];
  const camera = entry.canvas?.camera ?? {
    fov: 45,
    position: [0, 0, 5] as [number, number, number],
  };

  // Optional: pause rendering when tab hidden
  useEffect(() => {
    const onVis = () => {
      // you can set state to control frameloop if you want; keeping simple here
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas dpr={dpr} camera={camera} frameloop="always">
        <ambientLight intensity={1} />
        <OrbitControls />

        <Background color={bg} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
