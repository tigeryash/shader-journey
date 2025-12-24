import { STEPS } from "lib/steps";

const Steps = ({ slug, step }: { slug: string | undefined; step: number }) => {
	return (
		<div className="fixed left-0 top-12 flex self-end w-full py-2 gap-4 z-50">
			{STEPS[slug ? parseInt(slug, 10) - 1 : 0].map((step, idx) => (
				<button
					type="button"
					key={step.title}
					className="px-4 py-2 rounded-lg bg-amber-500/90 backdrop-blur-md border
					 border-white/30 pointer-events-auto cursor-pointer"
				>
					{`0${idx + 1} ${step.title}`}
				</button>
			))}
		</div>
	);
};

export default Steps;
