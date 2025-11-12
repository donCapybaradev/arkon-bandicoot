import Button from "@components/Button/Button"
import { formatDate } from "@utils/formatDate"
import { useMemo, useState } from "react"

import type { FormatPattern } from "@utils/formatDate"

export default function App() {
	const [pattern, setPattern] = useState<FormatPattern>("YYYY-MM-DD")
	const [tz, setTz] = useState<"utc" | "local">("utc")

	const now = useMemo(() => new Date(), [])
	const formatted = useMemo(() => formatDate(now, { pattern, tz }), [now, pattern, tz])

	return (
		<main style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
			<h1>React + Bun + Rsbuild</h1>
			<p>
				<strong>Fecha actual formateada:</strong> {formatted}
			</p>

			<section style={{ display: "flex", gap: 12, marginTop: 16 }}>
				<Button
					variant="primary"
					onClick={() => setPattern((p) => (p === "YYYY-MM-DD" ? "DD/MM/YYYY" : "YYYY-MM-DD"))}
				>
					Cambiar patrón ({pattern})
				</Button>

				<Button variant="secondary" onClick={() => setTz((v) => (v === "utc" ? "local" : "utc"))}>
					Cambiar zona ({tz})
				</Button>
			</section>

			<section style={{ marginTop: 24 }}>
				<Button onClick={() => console.log("Hola Cubo 👋")}>Log en consola</Button>
			</section>
		</main>
	)
}
