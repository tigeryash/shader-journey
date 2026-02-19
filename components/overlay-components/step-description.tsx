import { STEPS } from "lib/steps";

const StepDescription = ({
	step,
	slug,
}: {
	step: number;
	slug: string | undefined;
}) => {
	return (
		<div className="fixed top-32 left-10 border border-white/30 bg-black/30 backdrop-blur-md rounded-lg p-6 text-white  max-w-md">
			<p className=" ">
				{STEPS[slug ? parseInt(slug, 10) - 1 : 0][step]?.description}
			</p>
		</div>
	);
};

export default StepDescription;
