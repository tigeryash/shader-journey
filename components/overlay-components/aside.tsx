import { SHADER_DETAILS } from "lib/constants";
import { PanelRightOpen } from "lucide-react";
import { useState } from "react";

const Aside = ({
	slug,
	toggleOpen,
	setToggleOpen,
}: {
	slug: string | undefined;
	toggleOpen: boolean;
	setToggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const handleToggle = () => {
		setToggleOpen(!toggleOpen);
		console.log(toggleOpen);
	};
	return (
		<>
			<button
				type="button"
				onClick={handleToggle}
				style={{ pointerEvents: toggleOpen ? "none" : "auto" }}
				className={`fixed right-4 top-13.5 z-10 p-2 bg-zinc-900/80 backdrop-blur-md border
                     border-white/20 rounded-md transition-all group duration-300 hover:border-yellow-500/40 ${
												toggleOpen
													? "opacity-0 pointer-events-none"
													: "opacity-100 pointer-events-auto"
											}
					 `}
				disabled={toggleOpen}
			>
				<PanelRightOpen
					strokeWidth={1}
					className="rotate-180 text-white group-hover:text-yellow-500 transition-colors"
				/>
			</button>
			<aside
				className={`right-0 top-12 fixed h-full z-10 w-72 bg-zinc-900 backdrop-blur-md border-l
         border-white/20 text-white pointer-events-auto flex flex-col will-change-transform 
         transition-transform duration-[275ms] ${toggleOpen ? "delay-100 translate-x-0 ease-in-out" : "translate-x-full ease-in"}`}
			>
				<button
					type="button"
					onClick={handleToggle}
					className="p-2 border-b group border-white/20 self-start hover:text-yellow-500 transition-colors w-full h-13.5 flex items-center gap-2"
				>
					<PanelRightOpen strokeWidth={1} />{" "}
					<p className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
						Hide the Sidebar
					</p>
				</button>
				<ShaderInfo
					description={
						SHADER_DETAILS[slug ? parseInt(slug, 10) - 1 : 0].description
					}
				/>

				<Controls />

				<Techniques
					techniques={
						SHADER_DETAILS[slug ? parseInt(slug, 10) - 1 : 0].techniques
					}
				/>
			</aside>
		</>
	);
};

export default Aside;

const Container = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => {
	return (
		<section className="p-4 border-b border-white/20 space-y-2">
			<h2 className="font-mono text-[12.5px] opacity-40 uppercase font-[100]">
				{title}
			</h2>
			{children}
		</section>
	);
};

const ShaderInfo = ({ description }: { description: string }) => {
	return (
		<Container title="Shader Info">
			<p className="opacity-60 text-[15px] leading-4.5">{description}</p>
		</Container>
	);
};

const Controls = () => {
	return <Container title="Shader Controls">Controls</Container>;
};

const Techniques = ({ techniques }: { techniques: string[] }) => {
	return (
		<Container title="Techniques Used">
			<ul>
				{techniques.map((technique) => (
					<li key={technique}>{technique}</li>
				))}
			</ul>
		</Container>
	);
};
