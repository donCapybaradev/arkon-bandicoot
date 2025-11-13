import { Link } from "react-router-dom"

const Home: React.FC = () => {
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
		</div>
	)
}

export default Home
