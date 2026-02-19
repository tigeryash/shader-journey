import { STEPS } from "lib/steps";
import {
	Check,
	ChevronDown,
	ChevronUp,
	Code,
	Copy,
	GitCompare,
} from "lucide-react";
import { useMemo, useState } from "react";

const highlightGLSL = (code: string) => {
	const keywords =
		/\b(void|vec2|vec3|vec4|float|int|bool|mat2|mat3|mat4|sampler2D|in|out|uniform|const|return|if|else|for|while|break|continue|discard)\b/g;
	const builtins =
		/\b(sin|cos|tan|pow|sqrt|abs|floor|ceil|fract|mod|min|max|clamp|mix|step|smoothstep|length|distance|dot|cross|normalize|reflect|refract|texture)\b/g;
	const numbers = /\b(\d+\.?\d*f?)\b/g;
	const comments = /(\/\/.*$)/gm;

	return code
		.replace(
			comments,
			'<span class="text-muted-foreground/60 italic">$1</span>',
		)
		.replace(keywords, '<span class="text-primary">$1</span>')
		.replace(builtins, '<span class="text-cyan-400">$1</span>')
		.replace(numbers, '<span class="text-orange-300">$1</span>');
};

// Compute diff between two code strings
const computeDiff = (oldCode: string, newCode: string) => {
	const oldLines = oldCode.split("\n");
	const newLines = newCode.split("\n");

	return newLines.map((line, i) => {
		const oldLine = oldLines[i];
		if (oldLine === undefined) {
			return { line, type: "added" as const };
		}
		if (line !== oldLine) {
			return { line, type: "modified" as const };
		}
		return { line, type: "unchanged" as const };
	});
};

const ShaderShowcase = ({
	step,
	slug,
}: {
	step: number;
	slug: string | undefined;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const [showDiff, setShowDiff] = useState(false);

	const shaderIndex = slug ? parseInt(slug, 10) - 1 : 0;
	const currentStep = STEPS[shaderIndex]?.[step];
	const previousStep = step > 0 ? STEPS[shaderIndex]?.[step - 1] : null;

	const code = currentStep?.code ?? "";
	const previousCode = previousStep?.code ?? null;

	const diffLines = useMemo(() => {
		if (!previousCode || !showDiff) return null;
		return computeDiff(previousCode, code);
	}, [previousCode, code, showDiff]);

	const codeLines = code.split("\n");

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const onToggle = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div className="fixed bottom-4 left-4">
			{/* Toggle button */}
			<button
				type="button"
				onClick={onToggle}
				className={` flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-mono uppercase 
        tracking-wider text-muted-foreground hover:text-foreground transition-colors border border-white/30 
        hover:bg-secondary/30 pointer-events-auto backdrop-blur-sm bg-black/30 ${isOpen ? "hidden" : "flex"}`}
			>
				<Code className="w-3.5 h-3.5" />
				<span>View Code</span>
			</button>

			{/* Code panel */}
			<SnippetContainer
				step={step}
				showDiff={showDiff}
				setShowDiff={setShowDiff}
				handleCopy={handleCopy}
				copied={copied}
			>
				{/* Code content with line numbers */}
				<div className="overflow-auto max-h-72 bg-background/50">
					<table className="w-full">
						<tbody>
							{(
								diffLines ||
								codeLines.map((line) => ({
									line,
									type: "unchanged" as const,
								}))
							).map((item, i) => (
								<tr
									key={item.type}
									className={`
                      ${item.type === "added" ? "bg-green-500/10" : ""}
                      ${item.type === "modified" ? "bg-primary/10" : ""}
                    `}
								>
									<td className="px-4 py-0.5 text-right text-xs font-mono text-muted-foreground/40 select-none w-12 border-r border-border/20">
										{i + 1}
									</td>
									<td className="px-4 py-0.5">
										<pre className="text-sm font-mono leading-relaxed">
											<code
												className="text-foreground/90"
												dangerouslySetInnerHTML={{
													__html: highlightGLSL(
														typeof item === "string" ? item : item.line,
													),
												}}
											/>
										</pre>
									</td>
									{showDiff && (
										<td className="w-6 text-center">
											{item.type === "added" && (
												<span className="text-green-400 text-xs">+</span>
											)}
											{item.type === "modified" && (
												<span className="text-primary text-xs">~</span>
											)}
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</SnippetContainer>
		</div>
	);
};

export default ShaderShowcase;

const SnippetContainer = ({
	step,
	showDiff,
	setShowDiff,
	handleCopy,
	copied,
	children,
}: {
	step: number;
	showDiff: boolean;
	setShowDiff: React.Dispatch<React.SetStateAction<boolean>>;
	handleCopy: () => void;
	copied: boolean;
	children: React.ReactNode;
}) => {
	return (
		<div className="w-80 max-w-full rounded-lg overflow-hidden shadow-lg pointer-events-auto bg-background/80 backdrop-blur-sm border border-white/30">
			<div className="flex items-center justify-between px-4 py-2 bg-secondary/30">
				<div className="flex items-center gap-3">
					<span className="font-mono text-xs text-muted-foreground uppercase">
						glsl
					</span>
					{step > 0 && (
						<button
							type="button"
							onClick={() => setShowDiff(!showDiff)}
							className={`h-7 px-2 text-xs gap-1.5 ${showDiff ? "text-primary" : ""}`}
						>
							<GitCompare className="w-3 h-3" />
							<span>Diff</span>
						</button>
					)}
				</div>
				<button
					type="button"
					onClick={handleCopy}
					className="h-7 px-2 text-xs gap-1.5"
				>
					{copied ? (
						<>
							<Check className="w-3 h-3" />
							<span>Copied</span>
						</>
					) : (
						<>
							<Copy className="w-3 h-3" />
							<span>Copy</span>
						</>
					)}
				</button>
			</div>
			{children}
		</div>
	);
};
