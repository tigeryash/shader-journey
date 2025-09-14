import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Yash's React Shaders" },
    {
      name: "description",
      content:
        "Converting Vanilla Threejs examples from threejs journey to React Three Fiber and Typescript.",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
