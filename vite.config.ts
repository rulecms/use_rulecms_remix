import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupReplace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]",
    },
  },
  ssr: {
    noExternal: ["@rulecms/widget-react", "@rulecms/source-components-react"],
  },
  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        "process.env.NODE_ENV": JSON.stringify("development"),
      },
    }),
    react(),
  ],
  resolve: process.env.USE_SOURCE
    ? {
        alias: {
          "react-router": path.resolve(
            __dirname,
            "../../packages/react-router/index.ts",
          ),
          "react-router-dom": path.resolve(
            __dirname,
            "../../packages/react-router-dom/index.tsx",
          ),
        },
      }
    : {},
});
