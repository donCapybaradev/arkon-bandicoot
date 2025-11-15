import Button from "@components/Button/Button"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

describe("Button", () => {
	it("muestra el texto y rol accesible", () => {
		render(<Button>Guardar</Button>)
		const btn = screen.getByRole("button", { name: /guardar/i })
		expect(btn).toBeInTheDocument()
	})

	it("ejecuta onClick cuando no está deshabilitado", () => {
		const onClick = vi.fn()
		render(<Button onClick={onClick}>Click</Button>)
		fireEvent.click(screen.getByRole("button", { name: /click/i }))
		expect(onClick).toHaveBeenCalledTimes(1)
	})

	it("no llama onClick cuando disabled", () => {
		const onClick = vi.fn()
		render(
			<Button onClick={onClick} disabled>
				Disabled
			</Button>
		)
		fireEvent.click(screen.getByRole("button", { name: /disabled/i }))
		expect(onClick).not.toHaveBeenCalled()
		expect(screen.getByRole("button", { name: /disabled/i })).toBeDisabled()
	})

	it("aplica variant secundario vía data-attribute", () => {
		render(<Button variant="secondary">Sec</Button>)
		const btn = screen.getByRole("button", { name: /sec/i })
		expect(btn).toHaveAttribute("data-variant", "secondary")
	})
})
