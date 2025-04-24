import path, { resolve } from "node:path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import tsconfigPathsPlugin from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

const tsConfigPaths = tsconfigPathsPlugin({
  projects: [path.resolve("tsconfig.json")],
});

export default defineConfig({
  main: {
    plugins: [tsConfigPaths, externalizeDepsPlugin()],
    publicDir: resolve("resources"),
  },
  preload: {
    plugins: [tsConfigPaths, externalizeDepsPlugin()],
  },
  renderer: {
    define: {
      "process.platform": JSON.stringify(process.platform),
    },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
      },
    },
    plugins: [tsConfigPaths, react(), tailwindcss()],
  },
});
