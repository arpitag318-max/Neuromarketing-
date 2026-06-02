import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  esbuild: {
    jsxInject: `import * as React from 'react'`,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    netlify(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});

