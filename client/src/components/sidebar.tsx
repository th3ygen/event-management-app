import { Sheet, Typography, Button } from "@mui/joy";
import { Calendar, LogOut } from "lucide-react";

export default function Sidebar() {
	return (
		<Sheet
			sx={{
				width: 240,
				height: "100vh",
				position: "fixed",
				top: 0,
				left: 0,
				display: "flex",
				flexDirection: "column",
				borderRight: "1px solid",
				borderColor: "divider",
				p: 2,
				boxShadow: "md",
				zIndex: 10,
				backgroundColor: "white",
			}}
		>
			{/* Logo and Title */}
			<div className="flex items-center gap-2 py-4 mb-6">
				<div className="flex items-center justify-center w-10 h-10 rounded-md bg-blue-500 text-white">
					<Calendar className="h-6 w-6" />
				</div>
				<Typography level="h4" fontWeight="bold">
					EventFlow
				</Typography>
			</div>

			{/* Navigation */}
			<div className="flex-1">
				<a href="/" className="no-underline">
					<div className="flex items-center gap-3 px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium">
						<Calendar className="h-5 w-5" />
						<span>Events</span>
					</div>
				</a>
			</div>

			{/* Sign Out Button */}
			<Button
				variant="outlined"
				color="neutral"
				size="lg"
				startDecorator={<LogOut className="h-4 w-4" />}
				className="mt-4 w-full"
			>
				Sign Out
			</Button>
		</Sheet>
	);
}
