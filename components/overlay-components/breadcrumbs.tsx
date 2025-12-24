import { House } from "lucide-react";
import { useState } from "react";

const Breadcrumbs = ({ slug }: { slug: string | undefined }) => {
	const [hovered, setHovered] = useState(false);
	return (
		<header
			className=" top-6 left-6 flex items-center gap-3 text-sm font-medium text-white/60 pointer-events-auto  px-3
         bg-black/30 backdrop-blur-md border-b border-white/20 h-12"
		>
			<a
				className="flex items-center justify-center space-x-2 group transition-all duration-200"
				href="/"
				onMouseEnter={() => setHovered((prev) => !prev)}
				onMouseLeave={() => setHovered((prev) => !prev)}
			>
				<House size={25} className="group-hover:text-yellow-400" />{" "}
				<p className="group-hover:underline text-lg group-hover:text-yellow-400">
					{" "}
					Home{" "}
				</p>
			</a>
			<p
				className={`text-lg text-amber-500 transition-all duration-200 ${hovered ? "opacity-60" : ""}`}
			>
				<span className="text-white opacity-60">{">"}</span> Shader {slug}
			</p>
		</header>
	);
};

export default Breadcrumbs;
