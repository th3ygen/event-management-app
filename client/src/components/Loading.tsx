import { Box } from "@mui/material";
import { motion, Variants } from "framer-motion";

const LoadingAnimation = () => {
	// Color theme - matching the landing page
	const theme = {
		primary: "#2c3e50",
		secondary: "#3498db",
		accent: "#1a5276",
	};

	// Animation variants for triangles
	const triangleVariants = {
		initial: { rotate: 0, scale: 1 },
		animate: (i: number) => ({
			rotate: [0, 120, 240, 360],
			scale: [1, 1.2, 1],
			x: [0, 30, 0, -30, 0],
			y: [0, -30, 0, 30, 0],
			transition: {
				duration: 2.5,
				repeat: Infinity,
				repeatType: "loop",
				delay: i * 0.3,
				ease: "easeInOut",
			},
		}),
	} satisfies Variants;

	// Triangle component
	const Triangle = ({ color, index }: { color: string; index: number }) => (
		<motion.div
			custom={index}
			variants={triangleVariants}
			initial="initial"
			animate="animate"
			style={{
				width: 0,
				height: 0,
				borderLeft: "20px solid transparent",
				borderRight: "20px solid transparent",
				borderBottom: `35px solid ${color}`,
				position: "absolute",
				transformOrigin: "center",
			}}
		/>
	);

	return (
		<Box sx={{ position: "fixed", top: 0, left: 0, display: "flex", justifyContent: "center", height: "100vh", width: "100%", alignItems: "center"}}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "200px",
					width: "200px",
					position: "relative",
				}}
			>
				<Box
					sx={{ position: "relative", width: "80px", height: "80px" }}
				>
					{/* Top Triangle */}
					<Box
						sx={{
							position: "absolute",
							top: "-40px",
							left: "20px",
						}}
					>
						<Triangle color={theme.primary} index={0} />
					</Box>

					{/* Bottom Left Triangle */}
					<Box
						sx={{
							position: "absolute",
							bottom: "0",
							left: "-20px",
						}}
					>
						<Triangle color={theme.secondary} index={1} />
					</Box>

					{/* Bottom Right Triangle */}
					<Box
						sx={{
							position: "absolute",
							bottom: "0",
							right: "-20px",
						}}
					>
						<Triangle color={theme.accent} index={2} />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default LoadingAnimation;
