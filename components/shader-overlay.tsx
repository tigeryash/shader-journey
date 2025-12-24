import { STEPS } from "lib/steps";
import { useState } from "react";
import Breadcrumbs from "./overlay-components/breadcrumbs";
import Aside from "./overlay-components/aside";
import Steps from "./overlay-components/steps";
import Navigation from "./overlay-components/navigation";
import StepsCounter from "./overlay-components/steps-counter";
import CodeSnippet from "./overlay-components/code-snippet";

export default function ShaderOverlay({ slug }: { slug: string | undefined }) {
	const [step, setStep] = useState(0);
	const steps = slug ? STEPS[parseInt(slug, 10) - 1] : [];
	const currentStep = steps[step];

	return (
		<main className="absolute inset-0 z-2 h-screen w-full pointer-events-none">
			<Breadcrumbs slug={slug} />
			<Aside slug={slug} />
			<Steps slug={slug} step={step} />
			{/* <Navigation setStep={setStep} />
			<StepsCounter />
			<CodeSnippet step={currentStep} /> */}
		</main>
	);
}
