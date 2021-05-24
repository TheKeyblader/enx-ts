import type { Options } from "tsup";
export const tsup: Options = {
    entryPoints: ["src/index.ts"],
    format: ["cjs", "esm"],
    env: { NODE_ENV: "production" },
    minify: true,
    dts: true,
};
