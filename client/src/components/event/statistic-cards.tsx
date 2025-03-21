import { Grid, Card, Typography } from "@mui/joy";
import { Calendar, MapPin } from "lucide-react";
import type { EventFormData } from "./event-form-modal";

type StatisticsCardsProps = {
	events: EventFormData[];
};

export default function StatisticsCards({ events }: StatisticsCardsProps) {
	// Calculate statistics
	const totalEvents = events.length;
	const upcomingEvents = events.filter(
		(event) => new Date(event.startDate) > new Date()
	).length;
	const eventsThisMonth = events.filter((event) => {
		const eventDate = new Date(event.startDate);
		const now = new Date();
		return (
			eventDate.getMonth() === now.getMonth() &&
			eventDate.getFullYear() === now.getFullYear()
		);
	}).length;

	// Find most popular venue
	const venueCount: Record<string, number> = {};
	events.forEach((event) => {
		venueCount[event.venue] = (venueCount[event.venue] || 0) + 1;
	});
	const mostPopularVenue = Object.entries(venueCount).reduce(
		(max, [venue, count]) => (count > max.count ? { venue, count } : max),
		{ venue: "None", count: 0 }
	);

	return (
		<Grid container spacing={2} className="mb-6 pt-4">
			<Grid xs={12} sm={6} md={3}>
				<Card className="p-4 h-full bg-white shadow-sm">
					<div className="flex items-center gap-4">
						<div className="p-2 rounded-full bg-blue-100">
							<Calendar className="h-6 w-6 text-blue-600" />
						</div>
						<div>
							<Typography
								level="body-sm"
								className="text-gray-600"
							>
								Total Events
							</Typography>
							<Typography level="h3">{totalEvents}</Typography>
						</div>
					</div>
				</Card>
			</Grid>
			<Grid xs={12} sm={6} md={3}>
				<Card className="p-4 h-full bg-white shadow-sm">
					<div className="flex items-center gap-4">
						<div className="p-2 rounded-full bg-green-100">
							<Calendar className="h-6 w-6 text-green-600" />
						</div>
						<div>
							<Typography
								level="body-sm"
								className="text-gray-600"
							>
								Upcoming Events
							</Typography>
							<Typography level="h3">{upcomingEvents}</Typography>
						</div>
					</div>
				</Card>
			</Grid>
			<Grid xs={12} sm={6} md={3}>
				<Card className="p-4 h-full bg-white shadow-sm">
					<div className="flex items-center gap-4">
						<div className="p-2 rounded-full bg-purple-100">
							<Calendar className="h-6 w-6 text-purple-600" />
						</div>
						<div>
							<Typography
								level="body-sm"
								className="text-gray-600"
							>
								Events This Month
							</Typography>
							<Typography level="h3">
								{eventsThisMonth}
							</Typography>
						</div>
					</div>
				</Card>
			</Grid>
			<Grid xs={12} sm={6} md={3}>
				<Card className="p-4 h-full bg-white shadow-sm">
					<div className="flex items-center gap-4">
						<div className="p-2 rounded-full bg-amber-100">
							<MapPin className="h-6 w-6 text-amber-600" />
						</div>
						<div>
							<Typography
								level="body-sm"
								className="text-gray-600"
							>
								Popular Venue
							</Typography>
							<Typography level="h3">
								{mostPopularVenue.venue}
							</Typography>
							<Typography
								level="body-xs"
								className="text-gray-500"
							>
								{mostPopularVenue.count} events
							</Typography>
						</div>
					</div>
				</Card>
			</Grid>
		</Grid>
	);
}
