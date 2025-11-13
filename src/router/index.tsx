import ArkonLoader from "@components/ArkonLoader/ArkonLoader"
import { safeImport } from "@helpers/safeImport"
import Home from "@pages/Home/Home"
import React, { Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

const RemoteContextManager = React.lazy(() =>
	safeImport(
		() => import("contextManager/App"),
		() => import("@components/ServiceUnavailable/ServiceUnavailable")
	)
)

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/context-manager/*"
					element={
						<Suspense fallback={<ArkonLoader />}>
							<RemoteContextManager />
						</Suspense>
					}
				/>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	)
}
