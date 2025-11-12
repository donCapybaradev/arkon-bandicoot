import { formatDate } from "@utils/formatDate"
import { describe, expect, it } from "vitest"

describe("formatDate", () => {
	it("formatea en UTC por defecto a YYYY-MM-DD", () => {
		// Fecha fija en UTC para evitar flaky por zona horaria
		const d = new Date("2025-11-12T05:00:00Z")
		expect(formatDate(d)).toBe("2025-11-12")
	})

	it("permite patrón DD/MM/YYYY", () => {
		const d = new Date("2025-03-01T00:00:00Z")
		expect(formatDate(d, { pattern: "DD/MM/YYYY" })).toBe("01/03/2025")
	})

	it("acepta string y number como entrada", () => {
		expect(formatDate("2024-01-02T00:00:00Z")).toBe("2024-01-02")
		expect(formatDate(Date.UTC(2024, 0, 2))).toBe("2024-01-02") // months 0-based
	})

	it("arroja error con fecha inválida", () => {
		expect(() => formatDate("not-a-date")).toThrow("Invalid date")
	})

	it("soporta modo local (no flaky si usas medianoche local)", () => {
		const localMidnight = new Date(2025, 10, 12, 0, 0, 0, 0) // 12 Nov 2025 local
		expect(formatDate(localMidnight, { tz: "local" })).toBe("2025-11-12")
	})
})
