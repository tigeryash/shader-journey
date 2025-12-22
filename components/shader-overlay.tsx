import { STEPS } from "lib/steps";
import { useState } from "react";

export default function ShaderOverlay({ slug }: { slug: string | undefined }) {
	const [step, setStep] = useState(0);
	const steps = slug ? STEPS[parseInt(slug, 10) - 1] : [];
	const currentStep = steps[step];

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				zIndex: 100,
				color: "white",
				padding: "2rem",
				pointerEvents: "none", // Allows clicking through to the canvas
			}}
		>
			<div
				style={{
					pointerEvents: "auto",
					background: "rgba(0,0,0,0.7)",
					padding: "1.5rem",
					borderRadius: "8px",
				}}
			>
				<h1>{currentStep.title}</h1>
				<p>{currentStep.description}</p>
				<pre
					style={{
						background: "#1e1e1e",
						padding: "1rem",
						borderRadius: "4px",
						overflow: "auto",
						maxWidth: "400px",
					}}
				>
					<code>{currentStep.code}</code>
				</pre>

				<div style={{ marginTop: "1rem" }}>
					<button
						type="button"
						disabled={step === 0}
						onClick={() => setStep((prev) => prev - 1)}
					>
						Previous
					</button>
					<button
						type="button"
						style={{ marginLeft: "0.5rem" }}
						disabled={step === steps.length - 1}
						onClick={() => setStep((prev) => prev + 1)}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}
