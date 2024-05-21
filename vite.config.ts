import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3001,
    },
    resolve: {
        // install @types/node trước
        // yarn add -D @types/node | npm i -D @types/node
        alias: {
            assets: path.resolve(__dirname, "./src/assets"),
            components: path.resolve(__dirname, "./src/components"),
            layouts: path.resolve(__dirname, "./src/components/layouts"),
            template: path.resolve(__dirname, "./src/components/template"),
            contexts: path.resolve(__dirname, "./src/contexts"),
            ui: path.resolve(__dirname, "./src/components/ui"),
            constant: path.resolve(__dirname, "./src/constant"),
            hooks: path.resolve(__dirname, "./src/hooks"),
            libs: path.resolve(__dirname, "./src/libs"),
            pages: path.resolve(__dirname, "./src/pages"),
            router: path.resolve(__dirname, "./src/router"),
            schemas: path.resolve(__dirname, "./src/schemas"),
            services: path.resolve(__dirname, "./src/services"),
            store: path.resolve(__dirname, "./src/store"),
            types: path.resolve(__dirname, "./src/types"),
            utils: path.resolve(__dirname, "./src/utils"),
        },
    },
});
