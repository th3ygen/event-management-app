import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Container,
	Grid2 as Grid,
	Box,
	Stack,
} from "@mui/material";
import { motion } from "motion/react";
import EventCard from "../../components/event/event-card";

const Landing = () => {
	// Color theme
	const theme = {
		primary: "#2c3e50",
		secondary: "#3498db",
		accent: "#1a5276",
		light: "#eef2f6",
		text: "#2c3e50",
	};

	return (
		<Box sx={{ bgcolor: theme.light, minHeight: "100vh", width: "100%" }}>
			{/* App Bar */}
			<AppBar
				position="sticky"
				sx={{ bgcolor: theme.primary, boxShadow: 2 }}
			>
				<Toolbar>
					{/* Logo */}
					<motion.div
						layoutId="logo"
						style={{
							width: "40px",
							height: "40px",
							backgroundColor: theme.secondary,
							borderRadius: "4px",
						}}
					/>

					<Typography
						variant="h6"
						sx={{ ml: 2, flexGrow: 1, color: "white" }}
					>
						EventFlow
					</Typography>

					{/* Navigation */}
					<Stack direction="row" gap="10">
						<motion.div layoutId="about-nav">
							<Button
								color="inherit"
								href="#about"
								sx={{
									mx: 1,
									"&:hover": {
										bgcolor: theme.accent,
										transition: "all 0.3s",
									},
								}}
							>
								About
							</Button>
						</motion.div>

						<motion.div layoutId="events-nav">
							<Button
								color="inherit"
								href="#events"
								sx={{
									mx: 1,
									"&:hover": {
										bgcolor: theme.accent,
										transition: "all 0.3s",
									},
								}}
							>
								Events
							</Button>
						</motion.div>
					</Stack>
				</Toolbar>
			</AppBar>

			<Box
				id="events"
				sx={{ py: 8, bgcolor: theme.primary, color: "white" }}
			>
				<Container>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<Typography
							variant="h3"
							sx={{ mb: 4, textAlign: "center" }}
						>
							Upcoming Events
						</Typography>

						<Grid container spacing={4}>
							{Array(9)
								.fill(0)
								.map((_, x) => (
									<Grid key={x} size={4} sx={{ position: "relative" }}>
										<EventCard name={"event-" + x} />
									</Grid>
								))}
						</Grid>

						<Box sx={{ textAlign: "center", mt: 6 }}>
							<Button
								variant="outlined"
								size="large"
								sx={{
									color: "white",
									borderColor: "white",
									"&:hover": {
										bgcolor: "rgba(255,255,255,0.1)",
										borderColor: "white",
									},
								}}
							>
								View All Events
							</Button>
						</Box>
					</motion.div>
				</Container>
			</Box>

			{/* Footer */}
			<Box sx={{ bgcolor: theme.accent, color: "white", py: 4 }}>
				<Container>
					<Grid container spacing={2} alignItems="center">
						<Grid size={12}>
							<Typography variant="body2">
								© 2025 EventFlow. All rights reserved.
							</Typography>
						</Grid>
						<Grid
							size={12}
							sx={{ textAlign: { xs: "left", md: "right" } }}
						>
							<Button color="inherit" size="small" sx={{ mr: 1 }}>
								Privacy Policy
							</Button>
							<Button color="inherit" size="small" sx={{ mr: 1 }}>
								Terms of Service
							</Button>
							<Button color="inherit" size="small">
								Contact
							</Button>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Box>
	);
};

export default Landing;
