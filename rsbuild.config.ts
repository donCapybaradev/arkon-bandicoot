import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack"
import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import { getAliasesFromTSConfig } from "./tools/aliases"

export default defineConfig({
	plugins: [pluginReact()],
	server: { port: 3000 },
	html: {
		template: "./src/index.html",
		title: "Index Cortex"
	},
	resolve: {
		alias: getAliasesFromTSConfig()
	},
	tools: {
		rspack: {
			output: { crossOriginLoading: "anonymous" },
			plugins: [
				new ModuleFederationPlugin({
					name: "bandicoot",
					remotes: {
						contextManager: "context_manager@http://localhost:3001/mf-manifest.js"
					},
					shared: {
						react: { singleton: true, eager: true, requiredVersion: false },
						"react-dom": { singleton: true, eager: true, requiredVersion: false },
						"react-router-dom": { singleton: true, eager: true, requiredVersion: false },
						"react-router": { singleton: true, eager: true, requiredVersion: false }
					}
				})
			]
		}
	}
})
