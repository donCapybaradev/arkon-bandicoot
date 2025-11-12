export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary"
}

export default function Button({
	variant = "primary",
	disabled,
	children,
	className = "",
	...rest
}: ButtonProps) {
	const base = "inline-flex items-center justify-center px-4 py-2 rounded-md border transition"
	const styles = variant === "primary" ? "border-transparent" : "border-current opacity-90"
	const disabledCls = disabled ? "opacity-50 cursor-not-allowed" : ""

	return (
		<button
			aria-disabled={disabled ? "true" : undefined}
			data-variant={variant}
			className={`${base} ${styles} ${disabledCls} ${className}`.trim()}
			disabled={disabled}
			type="button"
			{...rest}
		>
			{children}
		</button>
	)
}
