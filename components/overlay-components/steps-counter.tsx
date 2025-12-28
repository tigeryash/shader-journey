import { useEffect, useRef, useState } from "react";

const StepsCounter = ({
	step,
	length,
	toggleOpen,
}: {
	step: number;
	length: number;
	toggleOpen: boolean;
}) => {
	const [prevStep, setPrevStep] = useState(step);
	const [isAnimating, setIsAnimating] = useState(false);

	const lastStepProp = useRef(step);

	useEffect(() => {
		if (step !== lastStepProp.current) {
			// 1. If interrupted, the new 'source' is the target of the previous animation
			setPrevStep(lastStepProp.current);
			lastStepProp.current = step;

			// 2. Reset animation state to snap the cube back to 0deg instantly
			setIsAnimating(false);

			// 3. Restart the animation on the next tick to trigger the CSS transition
			const timeout = setTimeout(() => {
				setIsAnimating(true);
			}, 10);

			return () => clearTimeout(timeout);
		}
	}, [step]);

	useEffect(() => {
		if (isAnimating) {
			const timer = setTimeout(() => {
				setIsAnimating(false);
				setPrevStep(step);
			}, 600); // Match CSS duration
			return () => clearTimeout(timer);
		}
	}, [isAnimating, step]);

	return (
		<div
			className={` fixed bottom-0 p-4 right-[16%] text-white text-2xl font-mono transition-transform 
				duration-300  ${toggleOpen ? "translate-x-0 ease-in-out" : "translate-x-[350%] ease-in"}`}
		>
			<div className=" perspective-1000 w-12 h-8 fixed -left-8">
				<div
					className={`relative w-full h-full transition-transform  ease-in-out  ${
						isAnimating ? "duration-600" : "duration-0"
					}`}
					style={{
						transform: isAnimating
							? prevStep < step
								? "rotateX(90deg)"
								: "rotateX(-90deg)"
							: "rotateX(0deg)",
						transformStyle: "preserve-3d",
					}}
				>
					<span
						className={`absolute  backface-hidden  `}
						style={{ transform: "rotateX(0deg) translateZ(16px)" }}
					>
						0{prevStep + 1}
					</span>
					<span
						className="absolute  backface-hidden "
						style={{
							transform: "rotateX(90deg) translateZ(16px)",
						}}
					>
						0{step + 1}
					</span>
					<span
						className="absolute  backface-hidden "
						style={{
							transform: "rotateX(-90deg) translateZ(16px)",
						}}
					>
						0{step + 1}
					</span>
				</div>
			</div>
			/ 0{length}
		</div>
	);
};

export default StepsCounter;
