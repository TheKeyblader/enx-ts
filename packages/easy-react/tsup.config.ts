import type { Options } from "tsup";
export const tsup: Options = {
    entryPoints: ["src/index.ts"],
    format: ["cjs"],
    env: { NODE_ENV: "production" },
    minify: true,
};
