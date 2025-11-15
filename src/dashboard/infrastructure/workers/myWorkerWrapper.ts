export function createMyWorker() {
	return new Worker(new URL("./myWorker.js", import.meta.url))
}
