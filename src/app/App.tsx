import { Suspense, useEffect } from "react"
import AppRouter from "./router/index"
import "./styles/globals.css"

export default function App() {
	useEffect(() => {
		const loading = document.getElementById("loading-screen")

		if (loading) {
			setTimeout(() => {
				loading.remove()
			}, 1000)
		}
	}, [])

	return (
		<Suspense fallback={null}>
			<AppRouter />
		</Suspense>
	)
}
