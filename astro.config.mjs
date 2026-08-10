import { defineConfig } from "astro/config";
import sentry from "@sentry/astro";
import { loadEnv } from "vite";

const { SENTRY_AUTH_TOKEN } = loadEnv(
  process.env.NODE_ENV ?? "development",
  process.cwd(),
  "",
);

export default defineConfig({
  integrations: [
    sentry({
      project: "astrogamer",
      org: "jamedie",
      authToken: SENTRY_AUTH_TOKEN,
      sourcemaps: {
        filesToDeleteAfterUpload: ["./dist/**/*.map"],
      },
    }),
  ],
});
