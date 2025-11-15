export type FormatPattern = "YYYY-MM-DD" | "DD/MM/YYYY"

export interface FormatDateOptions {
	tz?: "utc" | "local"
	pattern?: FormatPattern
}

export function formatDate(input: Date | number | string, opts: FormatDateOptions = {}): string {
	const { tz = "utc", pattern = "YYYY-MM-DD" } = opts

	const d = input instanceof Date ? new Date(input.getTime()) : new Date(input)
	if (Number.isNaN(d.getTime())) {
		throw new Error("Invalid date")
	}

	const get = (fnUtc: () => number, fnLocal: () => number) => (tz === "utc" ? fnUtc() : fnLocal())

	const year = get(
		() => d.getUTCFullYear(),
		() => d.getFullYear()
	)
	const month = get(
		() => d.getUTCMonth() + 1,
		() => d.getMonth() + 1
	)
	const day = get(
		() => d.getUTCDate(),
		() => d.getDate()
	)

	const mm = String(month).padStart(2, "0")
	const dd = String(day).padStart(2, "0")

	switch (pattern) {
		case "YYYY-MM-DD":
			return `${year}-${mm}-${dd}`
		case "DD/MM/YYYY":
			return `${dd}/${mm}/${year}`
		default:
			// Exhaustividad (por si amplías patrones en el futuro)
			return `${year}-${mm}-${dd}`
	}
}
