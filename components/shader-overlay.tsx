import { STEPS } from "lib/steps";
import { useState } from "react";
import Breadcrumbs from "./overlay-components/breadcrumbs";
import Aside from "./overlay-components/aside";
import Steps from "./overlay-components/steps";
import Navigation from "./overlay-components/navigation";
import StepsCounter from "./overlay-components/steps-counter";
import CodeSnippet from "./overlay-components/code-snippet";
import StepDescription from "./overlay-components/step-description";

export default function ShaderOverlay({ slug }: { slug: string | undefined }) {
	const [step, setStep] = useState(0);
	const [toggleOpen, setToggleOpen] = useState(true);

	const length = STEPS[slug ? parseInt(slug, 10) - 1 : 0].length;

	return (
		<main className="absolute inset-0 z-2 h-screen w-full pointer-events-none">
			<Breadcrumbs slug={slug} />
			<Aside
				slug={slug}
				toggleOpen={toggleOpen}
				setToggleOpen={setToggleOpen}
			/>
			<Steps slug={slug} step={step} setStep={setStep} />
			<Navigation step={step} setStep={setStep} length={length} />
			<StepDescription step={step} slug={slug} />
			<StepsCounter step={step} length={length} toggleOpen={toggleOpen} />
			<CodeSnippet step={step} />
		</main>
	);
}
