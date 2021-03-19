import { build } from "tsup";

build({
    dts: true,
    clean: true,
    entryPoints: ["./src/index.ts"],
    format: ["cjs", "esm"],
    globalName: "Odin",
    minify: true,
}).catch((err) => {
    console.error(err);
    process.exit(-1);
});
