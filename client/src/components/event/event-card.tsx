import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import { AnimatePresence, motion } from "motion/react";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Grid2 as Grid, Stack } from "@mui/material";
import { Users as UsersIcon, MapPin as MapPinIcon } from "lucide-react";

type EventCardProps = {
	name: string;
};

export default function EventCard({ name }: EventCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<AnimatePresence>
			<motion.div
				className={cn(
					"fixed top-0 left-0 w-full h-[100vh] pt-[50px] z-100 flex items-center justify-center",
					!isExpanded && "pointer-events-none"
				)}
			>
				{isExpanded && (
					<>
						<motion.div
							className="absolute top-0 left-0 w-full h-full bg-black/50 duration-300"
							onClick={() => {
								setIsExpanded(false);
							}}
						></motion.div>
						<motion.div
							layoutId={"event-card-" + name}
							className="h-[400px] w-[900px]"
						>
							<Card sx={{ width: "100%", height: "100%" }}>
								<CardOverflow>
									<AspectRatio
										minHeight="120px"
										maxHeight="300px"
									>
										<img
											src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
											srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
											loading="lazy"
											alt=""
										/>
									</AspectRatio>
									<Stack
										sx={{
											position: "absolute",
											bottom: 0,
											left: 0,
											p: "1rem",
											width: "100%",
										}}
										direction={"row"}
										justifyContent={"space-between"}
										alignItems={"end"}
									>
										<Typography
											level="title-lg"
											sx={{
												fontSize: "2rem",
												fontWeight: "bold",
												color: "white",
											}}
										>
											Yosemite National Park
										</Typography>
										<Stack
											direction="row"
											gap={"1rem"}
											sx={{
												alignItems: "center",
											}}
										>
											<Stack
												direction="row"
												alignItems="center"
												gap="0.4rem"
											>
												<Stack direction="row">
													<UsersIcon
														size="1rem"
														color="white"
													/>
												</Stack>
												<Typography
													sx={{
														fontSize: "sm",
														fontWeight: "light",
														color: "white",
													}}
												>
													10 joined
												</Typography>
											</Stack>
											<Typography sx={{ color: "white" }}>
												|
											</Typography>
											<Stack
												direction="row"
												alignItems="center"
												gap="0.4rem"
											>
												<Stack direction="row">
													<MapPinIcon
														size="1rem"
														color="white"
													/>
												</Stack>
												<Typography
													sx={{
														fontSize: "sm",
														fontWeight: "light",
														color: "white",
													}}
												>
													Padang Rengas, Perak
												</Typography>
											</Stack>
										</Stack>
									</Stack>
								</CardOverflow>
								<div>
									<IconButton
										aria-label="bookmark Bahamas Islands"
										variant="plain"
										color="neutral"
										size="sm"
										sx={{
											position: "absolute",
											top: "0.875rem",
											right: "0.5rem",
										}}
										onClick={handleToggle}
									>
										<BookmarkAdd />
									</IconButton>
								</div>
								<Grid>
									<Stack
										direction="row"
										justifyContent={"space-between"}
										sx={{
											width: "100%",
											height: "100%",
											textAlign: "center",
											gap: "1rem",
										}}
									>
										<Stack
											direction="row"
											sx={{ gap: "2rem" }}
										>
											<Stack direction="column">
												<Typography
													level="h4"
													sx={{
														fontSize: "1rem",
														fontWeight: 400,
													}}
												>
													Starts on
												</Typography>
												<Typography
													level="h4"
													sx={{
														fontWeight: 700,
													}}
												>
													12 August, 4:00PM
												</Typography>
											</Stack>
											<Stack direction="column">
												<Typography
													level="h4"
													sx={{
														fontSize: "1rem",
														fontWeight: 400,
													}}
												>
													Ends on
												</Typography>
												<Typography
													level="h4"
													sx={{
														fontWeight: 700,
													}}
												>
													12 August, 4:00PM
												</Typography>
											</Stack>
											<Stack direction="column">
												<Typography
													level="h4"
													sx={{
														fontSize: "1rem",
														fontWeight: 400,
													}}
												>
													Organized by
												</Typography>
												<Typography
													level="h4"
													sx={{
														fontWeight: 700,
													}}
												>
													Ascenity Solutions
												</Typography>
											</Stack>
										</Stack>
										<Button sx={{ px: "2rem", fontSize: "md" }}>Participate</Button>
									</Stack>
								</Grid>
							</Card>
						</motion.div>
					</>
				)}
			</motion.div>

			<motion.div
				layoutId={"event-card-" + name}
				layout="preserve-aspect"
			>
				<Card sx={{ width: "100%" }}>
					<CardOverflow>
						<AspectRatio minHeight="120px" maxHeight="200px">
							<img
								src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
								srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
								loading="lazy"
								alt=""
							/>
						</AspectRatio>
					</CardOverflow>
					<CardContent orientation="horizontal">
						<div>
							<Typography level="title-lg">
								Yosemite National Park
							</Typography>
							<Typography level="body-sm">
								April 24 to May 02, 2021
							</Typography>
						</div>
						<Button
							variant="solid"
							size="md"
							color="primary"
							aria-label="Explore Bahamas Islands"
							sx={{
								ml: "auto",
								alignSelf: "center",
								fontWeight: 600,
							}}
							onClick={handleToggle}
						>
							Participate
						</Button>
					</CardContent>
					<CardOverflow variant="soft" sx={{ bgcolor: "#cfd8dc" }}>
						<CardContent orientation="horizontal" sx={{ py: 1 }}>
							<Stack
								direction="row"
								alignItems={"center"}
								gap="1rem"
								sx={{ width: "100%" }}
							>
								<Stack
									direction="row"
									alignItems="center"
									gap="0.4rem"
								>
									<Stack direction="row">
										<UsersIcon size="1rem" />
									</Stack>
									<Typography
										sx={{
											fontSize: "sm",
											fontWeight: "light",
										}}
									>
										10 joined
									</Typography>
								</Stack>
								|
								<Stack
									direction="row"
									alignItems="center"
									gap="0.4rem"
								>
									<Stack direction="row">
										<MapPinIcon size="1rem" />
									</Stack>
									<Typography
										sx={{
											fontSize: "sm",
											fontWeight: "light",
										}}
									>
										Padang Rengas, Perak
									</Typography>
								</Stack>
							</Stack>
						</CardContent>
					</CardOverflow>
				</Card>
			</motion.div>
		</AnimatePresence>
	);
}
