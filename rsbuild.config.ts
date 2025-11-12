import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import { getAliasesFromTSConfig } from "./tools/aliases"

export default defineConfig({
	plugins: [pluginReact()],
	server: { port: 3000 },
	html: {
		template: "./src/index.html",
		title: "Cortex Web"
	},
	resolve: {
		alias: getAliasesFromTSConfig()
	}
})
