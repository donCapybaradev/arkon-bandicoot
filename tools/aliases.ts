import fs from "node:fs"
import path from "node:path"

type TSConfig = {
	compilerOptions?: {
		baseUrl?: string
		paths?: Record<string, string[]>
	}
}

export function getAliasesFromTSConfig(
	tsconfigPath = path.resolve(process.cwd(), "tsconfig.base.json")
): Record<string, string> {
	const raw = fs.readFileSync(tsconfigPath, "utf-8")
	const tsconfig = JSON.parse(raw) as TSConfig

	const baseUrl = tsconfig.compilerOptions?.baseUrl ?? "src"
	const baseAbs = path.resolve(process.cwd(), baseUrl)
	const paths = tsconfig.compilerOptions?.paths ?? {}

	const alias: Record<string, string> = {}

	for (const [key, mapArr] of Object.entries(paths)) {
		if (!mapArr?.length) continue
		const aliasKey = key.replace(/\/\*$/, "")
		const first = mapArr[0].replace(/\/\*$/, "")
		alias[aliasKey] = path.resolve(baseAbs, first)
	}

	return alias
}
