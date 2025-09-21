import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  esbuild: {
    loader: {
      ".js": "jsx",
    },
  },
  server: {
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url;
        if (url.includes(".mjs")) {
          res.setHeader("Content-Type", "application/javascript");
        } else if (url.includes(".css")) {
          res.setHeader("Content-Type", "text/css");
        } else if (url.includes(".jsx")) {
          res.setHeader("Content-Type", "text/jsx");
        }
        next();
      });
    },
  },
});
