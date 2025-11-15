import { createMyWorker } from "@/dashboard/infrastructure/workers/myWorkerWrapper"
import { Button } from "@cortex/ui"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Home: React.FC = () => {
	const [result, setResult] = useState<number | null>(null)

	useEffect(() => {
		const worker = createMyWorker()

		worker.onmessage = (e) => {
			console.log("MENSAJE DESDE WORKER:", e.data)
			setResult(e.data)
			worker.terminate()
		}

		worker.onerror = (err) => {
			console.error("ERROR EN WORKER:", err)
		}

		console.log("MANDANDO 21 AL WORKER")
		worker.postMessage(21)

		return () => worker.terminate()
	}, [])

	return (
		<div className="p-6 space-y-4">
			<h1 className="text-2xl font-semibold">Home</h1>

			<div
				className="rounded-xl border p-4
          border-[hsl(var(--border))]
          bg-[hsl(var(--card))]
          text-[hsl(var(--card-foreground))]"
			>
				<p className="text-sm opacity-80">Theme light activo ✅</p>
			</div>

			<p>Ir al Context Manager:</p>
			<Link
				to="/context-manager"
				className="inline-flex items-center rounded-md border px-3 py-2 text-sm
          border-[hsl(var(--border))]
          bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]
          hover:opacity-90 transition"
			>
				/context-manager
			</Link>

			<p>Ir al Knowledge Graph:</p>
			<Link
				to="/knowledge-graph"
				className="inline-flex items-center rounded-md border px-3 py-2 text-sm
          border-[hsl(var(--border))]
          bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]
          hover:opacity-90 transition"
			>
				/knowledge-graph
			</Link>

			<div style={{ padding: 32 }}>
				<p>Resultado recibido del Web Worker: {result ?? "calculando..."}</p>
			</div>

			<div>
				<Button variant="outline">ejemplo de botón</Button>
			</div>
		</div>
	)
}

export default Home
