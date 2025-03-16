import { Box } from "@mui/material";
import Landing from "./pages/landing";

export default function App() {
	return (
		<Box
			component="main"
			sx={{
				width: "100%",
				minHeight: "100vh",
			}}
		>
			<Landing />
		</Box>
	);
}
