import { SkipBack, SkipForward } from "lucide-react";

const Navigation = ({
	step,
	setStep,
	length,
}: {
	step: number;
	setStep: React.Dispatch<React.SetStateAction<number>>;
	length: number;
}) => {
	return (
		<div className="fixed bottom-4 left-2/5 -translate-x-1/2 z-10 flex gap-4 pointer-events-auto ">
			<button
				type="button"
				onClick={() => setStep(0)}
				disabled={step === 0}
				className={`${step === 0 ? "opacity-0 pointer-events-none" : ""} navigation-button`}
			>
				<SkipBack />
			</button>
			<button
				type="button"
				onClick={() => setStep(step - 1)}
				disabled={step === 0}
				className="navigation-button"
			>
				prev
			</button>
			<button
				type="button"
				onClick={() => setStep(step + 1)}
				disabled={step === length - 1}
				className="navigation-button"
			>
				next
			</button>
			<button
				type="button"
				onClick={() => setStep(length - 1)}
				disabled={step === length - 1}
				className={`navigation-button ${
					step === length - 1 ? "opacity-0 pointer-events-none" : ""
				}`}
			>
				<SkipForward strokeWidth=".5px" />
			</button>
		</div>
	);
};

export default Navigation;
