import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		include: ["src/__tests__/**/*.{test,spec}.{ts,tsx}"],
		environment: "jsdom",
		globals: true,
		setupFiles: "./src/setupTests.ts",
		css: true
	}
})
