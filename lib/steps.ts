import Step1 from "features/scenes/shader1/s1-1";
import Step2 from "features/scenes/shader1/s1-2";
import Step3 from "features/scenes/shader1/s1-3";

export const STEPS = [
	[
		{
			title: "Basic Plane",
			description: "Starting with a simple MeshStandardNodeMaterial.",
			code: `// Basic TSL setup\nconst colorNode = vec3(1, 0, 0);`,

			Component: Step1,
		},
		{
			title: "Adding Waves",
			description: "Using sin() and positionLocal to create movement.",
			code: `const zOffset = sin(positionLocal.x.mul(uFrequency)).mul(uAmplitude);`,
			Component: Step2,
		},
		{
			title: "Final Touches",
			description: "Adding texture and refining the shader.",
			code: `const flagTexture = texture(uv);`,
			Component: Step3,
		},
	],
];
