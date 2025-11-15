import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { getAliasesFromTSConfig } from "./tools/aliases";
import { printMFStatus } from "./tools/mf-checker";

const BASE_CONTEXT_MANAGER = process.env.BASE_CONTEXT_MANAGER || "/context-manager"

export default defineConfig({
	plugins: [pluginReact()],
	server: { port: 3000 },
	html: {
		template: "./public/index.html",
		title: "Index Cortex"
	},
	source: {
		entry: {
			index: "./src/app/index.tsx"
		}
	},
	resolve: {
		alias: getAliasesFromTSConfig()
	},
	performance: {
		buildCache: false,
		chunkSplit: {
			strategy: "split-by-experience"
		}
	},
	tools: {
		rspack: {
			output: { crossOriginLoading: "anonymous" },
			plugins: [
				new ModuleFederationPlugin({
					name: "bandicoot",
					remotes: {
						contextManager: `context_manager@${BASE_CONTEXT_MANAGER}/mf-manifest.js`,
					},
					shared: {
						react: { singleton: true, requiredVersion: false },
						"react-dom": { singleton: true, requiredVersion: false },
						"react-router-dom": { singleton: true, requiredVersion: false },
						"react-router": { singleton: true, requiredVersion: false }
					}
				}),
				{
          apply(compiler) {
            compiler.hooks.done.tap("MFStatusPlugin", async () => {
              await printMFStatus();
            });
          },
        },
			]
		}
	}
	// plugins: [
	// 	pluginCssMinimizer({
	// 		pluginOptions: (options) => {
	// 			options.minimizerOptions = {
	// 				preset: require.resolve("cssnano-preset-simple")
	// 			}
	// 		}
	// 	}),
	// 	pluginHtmlMinifierTerser(),
	// 	pluginImageCompress(),
	// 	pluginNodePolyfill()
	// ]
})
