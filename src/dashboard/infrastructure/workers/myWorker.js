/* eslint-env worker */
/* eslint-disable no-restricted-globals */ // self es válido en Web Workers

console.log("WORKER INICIADO")

self.onmessage = (event) => {
	console.log("WORKER RECIBIÓ:", event.data)

	const result = event.data * 2

	self.postMessage(result)
}
