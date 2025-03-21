import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import { Box } from "@mui/material";
import AdminAuthPage from "./pages/admin/auth";
import AdminEventsPage from "./pages/admin/events/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Toaster />
			<Box
				component="main"
				sx={{
					position: "relative",
					width: "100%",
					minHeight: "100vh",
				}}
			>
				{/* <LoadingAnimation /> */}
				<BrowserRouter>
					<Routes>
						<Route index element={<App />} />

						<Route path="auth" element={<AdminAuthPage />} />
						<Route path="admin">
							<Route
								path="events"
								element={<AdminEventsPage />}
							/>
						</Route>
					</Routes>
				</BrowserRouter>
			</Box>
			{/* <App /> */}
		</QueryClientProvider>
	</StrictMode>
);
