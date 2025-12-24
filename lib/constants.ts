export const SHADER_DETAILS = [
	{
		title: "Flag Shader",
		description:
			"First shader project creating a waving flag effect using vertex displacement and fragment shading techniques.",
		image: "",
		controls: [
			{
				name: "Position",
				type: "slider",
				min: 0,
				max: 10,
				step: 0.1,
			},
		],
		techniques: [""],
		extraFeatures: [
			{
				type: "COUNTRY_FLAG_SELECTOR",
				props: { label: "Select Country Flag" },
			},
		],
	},
];
