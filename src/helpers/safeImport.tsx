export function safeImport<T extends { default: React.ComponentType<any> }>(
	factory: () => Promise<T>,
	fallback: () => Promise<T> = () =>
		import("@components/FallbackComponent/FallbackComponent") as unknown as Promise<T>
): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		factory()
			.then(resolve)
			.catch(async (error) => {
				console.error("❌ Error al cargar remoto:", error)
				if (fallback) {
					console.warn("⚙️ Cargando fallback local...")
					try {
						const localModule = await fallback()
						resolve(localModule)
					} catch (fallbackError) {
						reject(fallbackError)
					}
				} else {
					reject(error)
				}
			})
	})
}
