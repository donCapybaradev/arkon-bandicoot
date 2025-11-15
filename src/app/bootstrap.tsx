import { createRoot } from "react-dom/client"
import App from "./App"

const container = document.querySelector<HTMLDivElement>("#root")

if (!container) {
	throw new Error('Elemento "#root" no encontrado')
}

createRoot(container).render(<App />)
