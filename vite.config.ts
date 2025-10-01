import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import glsl from "vite-plugin-glsl";
import ViteRestart from "vite-plugin-restart";

export default defineConfig({
  plugins: [
    tailwindcss(),
    ViteRestart({ restart: ["../static/**"] }),
    glsl(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
