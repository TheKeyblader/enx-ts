import { defineConfig } from "vite";
import { resolve } from "path";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    define: {
        "process.env": {},
    },
    resolve: {
        alias: {
            "@enx2/easy-react": resolve(__dirname, "../../packages/easy-react/src"),
            "@enx2/easy": resolve(__dirname, "../../packages/easy/src"),
        },
    },
});
