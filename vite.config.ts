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
    glsl({
      include: [
        // Glob pattern, or array of glob patterns to import
        "**/*.glsl",
        "**/*.wgsl",
        "**/*.vert",
        "**/*.frag",
        "**/*.vs",
        "**/*.fs",
      ],
      exclude: undefined, // Glob pattern, or array of glob patterns to ignore
      warnDuplicatedImports: true, // Warn if the same chunk was imported multiple times
      defaultExtension: "glsl", // Shader suffix when no extension is specified
      watch: true, // Recompile shader on change
      root: "/", // Directory for root imports
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
});
