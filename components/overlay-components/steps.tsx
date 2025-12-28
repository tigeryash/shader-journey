import { STEPS } from "lib/steps";

const Steps = ({
	slug,
	step,
	setStep,
}: {
	slug: string | undefined;
	step: number;
	setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div className="fixed left-0 top-12 flex self-end w-full px-4 py-2.5 gap-4 bg-black/30  border-b border-white/20 backdrop-blur-md z-2">
			{STEPS[slug ? parseInt(slug, 10) - 1 : 0].map((step, idx) => (
				<button
					type="button"
					key={step.title}
					className="px-3 py-1 rounded-lg bg-amber-500/90 backdrop-blur-md border
					 border-white/30 pointer-events-auto cursor-pointer hover:bg-amber-500/100 hover:border-white/50"
					onClick={() => setStep(idx)}
				>
					{`0${idx + 1} ${step.title}`}
				</button>
			))}
		</div>
	);
};

export default Steps;
