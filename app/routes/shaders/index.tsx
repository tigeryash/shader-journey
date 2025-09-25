import ShaderCard from "components/card";
import { shaderLinks } from "../../../constants/shaderLinks";

export function ShaderList() {
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <h1 className="text-4xl font-bold">
        Yash's React Shaders <br /> from Threejs Journey
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6 mt-8">
        {shaderLinks.map((shader) => (
          <ShaderCard key={shader.name} shader={shader} />
        ))}
      </div>
    </main>
  );
}
