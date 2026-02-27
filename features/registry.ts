import type { ComponentType } from "react";

// scene components (one per experience)
import Shader1 from "./scenes/tsl/shader1/shader1";
import RagingSea from "./scenes/glsl/raging-sea/scene";
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

export const glslShaders: Record<string, SceneEntry> = {
	"1": {
		title: "Raging Sea",
		component: RagingSea,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"2": {
		title: "Animated Galaxy",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"3": {
		title: "Modified materials",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"4": {
		title: "Coffee smoke",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"5": {
		title: "Hologram",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"6": {
		title: "Fireworks",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"7": {
		title: "Lights Shading",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"8": {
		title: "Raging Sea shading",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"9": {
		title: "Halftone Shading",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"10": {
		title: "Earth",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"11": {
		title: "Particles Cursor Animation",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"12": {
		title: "Particles Morphing",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"13": {
		title: "GPGPU Flow Field Particles",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"14": {
		title: "Wobbly Sphere",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"15": {
		title: "Sliced Model",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},
	"16": {
		title: "Procedural Terrain",
		component: Shader1,
		canvas: { background: "#0b1020" },
		description: "This is the first GLSL shader.",
		img: "",
	},


}
