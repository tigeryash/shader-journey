import type { ComponentType } from "react";

// scene components (one per experience)
import Shader1 from "./scenes/shader1";
// add more as you go
// import Shader2 from './scenes/Shader2';

export type SceneEntry = {
  title: string;
  component: ComponentType<any>;
  canvas?: {
    dpr?: number | [number, number];
    camera?: { fov?: number; position?: [number, number, number] };
    background?: string;
  };
  description: string;
  img: string;
};

export const shaders: Record<string, SceneEntry> = {
  "1": {
    title: "Shader 1",
    component: Shader1,
    canvas: { background: "#0b1020" },
    description: "This is the first shader.",
    img: "",
  },
  // '2': { title: 'Shader 2', component: Shader2 },
};
