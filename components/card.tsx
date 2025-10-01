import { NavLink } from "react-router";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import type { SceneEntry } from "features/registry";

type ShaderCardProps = {
  slug: string;
  shader: SceneEntry;
};

const ShaderCard = ({ slug, shader }: ShaderCardProps) => {
  const pillRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {});

  const enter = () => {};
  const leave = () => {};

  return (
    <NavLink
      to={`/shader/${slug}`}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      className=" relative  rounded-[2rem] p-2 group transition-transform
       ease-in-out glass hover:scale-105 duration-100"
    >
      <div className="relative overflow-hidden rounded-[1.8rem]">
        <img
          src="/shader-1.png"
          alt="shader-1 image"
          className="  w-48 inset-shadow-white-md "
        />
        <div className=" absolute left-1/2 -translate-x-1/2 h-48 bottom-0 w-full cardInfo" />
        <div
          className="absolute left-1/2 -translate-x-1/2 w-full bottom-0 
          px-4 pb-4 pt-16 bg-transparent  space-y-4"
        >
          <div className="space-y-1">
            <h2 className="text-lg ">{shader.title}</h2>

            <p className="text-sm">{shader.description}</p>
          </div>

          <span
            ref={pillRef}
            className="pill inline-grid max-w-full grid-cols-[1fr_auto] items-center gap-2
             overflow-hidden rounded-full bg-white px-4 py-2 text-black group-hover:cursor-pointer group-hover:w-full "
          >
            {/* Mask centers the track at rest */}
            <span className="mask relative min-w-0 overflow-hidden text-center">
              {/* Scrolling track, duplicate text for seamless wrap */}
              <span className="marquee-track inline-flex whitespace-nowrap">
                <span className=" pr-8">Check it out</span>
                <span className="copy pr-8" aria-hidden="true">
                  Check it out
                </span>
              </span>
            </span>
          </span>
        </div>
      </div>
    </NavLink>
  );
};

export default ShaderCard;
