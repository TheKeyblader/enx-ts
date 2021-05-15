import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { getAliases } from "vite-aliases";

const aliases = getAliases({ prefix: "" });

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    define: {
        "process.env": {},
    },
    resolve: {
        alias: aliases,
    },
});
