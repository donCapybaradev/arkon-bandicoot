import Home from "@/dashboard/ui/Home"
import ArkonLoader from "@/shared/ui/ArkonLoader/ArkonLoader"
import { safeImport } from "@/shared/utils/safeImport"
import React, { Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

const RemoteContextManager = React.lazy(() =>
	safeImport(
		() => import("contextManager/App"),
		() => import("@/shared/ui/ServiceUnavailable/ServiceUnavailable")
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
