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
    // Bundle dependencies into the server file. Leave React external so Node
    // can load react-dom/server without Vite trying to inline Node built-ins.
    noExternal: /^(?!react$|react-dom$|react-router-dom$).+/,
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
