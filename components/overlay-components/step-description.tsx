import { STEPS } from "lib/steps";

const StepDescription = ({
	step,
	slug,
}: {
	step: number;
	slug: string | undefined;
}) => {
	return (
		<div className="fixed top-32 left-10 border border-white/30 rounded-lg backdrop-blur-md bg-black/30 p-6">
			{STEPS[slug ? parseInt(slug, 10) - 1 : 0][step]?.description}
		</div>
	);
};

export default StepDescription;
