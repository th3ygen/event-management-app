"use client";

import { useState } from "react";
import {
	Sheet,
	Typography,
	Input,
	Button,
	Box,
	Table,
	IconButton,
	Chip,
} from "@mui/joy";
import { Edit, Search, Trash2, Plus } from "lucide-react";
import type { EventFormData } from "./event-form-modal";

type SortConfig = {
	key: string;
	direction: "ascending" | "descending";
};

type EventsTableProps = {
	events: EventFormData[];
	onCreateEvent: () => void;
	onUpdateEvent: (event: EventFormData) => void;
	onDeleteEvent: (id: number) => void;
};

export default function EventsTable({
	events,
	onCreateEvent,
	onUpdateEvent,
	onDeleteEvent,
}: EventsTableProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: "id",
		direction: "ascending",
	});
	const [filterVenue, setFilterVenue] = useState("all");

	// Handle sorting
	const requestSort = (key: string) => {
		let direction: "ascending" | "descending" = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	// Get sorted and filtered events
	const getSortedEvents = () => {
		let filteredEvents = [...events];

		// Apply venue filter
		if (filterVenue !== "all") {
			filteredEvents = filteredEvents.filter(
				(event) => event.venue === filterVenue
			);
		}

		// Apply search
		if (searchTerm) {
			filteredEvents = filteredEvents.filter(
				(event) =>
					event.name
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					event.organization
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					event.venue.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Apply sorting
		return filteredEvents.sort((a, b) => {
			if (
				a[sortConfig.key as keyof typeof a]! <
				b[sortConfig.key as keyof typeof b]!
			) {
				return sortConfig.direction === "ascending" ? -1 : 1;
			}
			if (
				a[sortConfig.key as keyof typeof a]! >
				b[sortConfig.key as keyof typeof b]!
			) {
				return sortConfig.direction === "ascending" ? 1 : -1;
			}
			return 0;
		});
	};

	// Get unique venues for filter
	const uniqueVenues = Array.from(
		new Set(events.map((event) => event.venue))
	);

	// Render status chip
	const renderStatusChip = (status: string) => {
		if (status === "ongoing") {
			return (
				<Chip size="sm" variant="soft" color="success">
					Ongoing
				</Chip>
			);
		} else {
			return (
				<Chip size="sm" variant="soft" color="neutral">
					Completed
				</Chip>
			);
		}
	};

	return (
		<Sheet className="p-4 mb-4 bg-white rounded-lg shadow-sm">
			<div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
				<Typography level="h2">Events List</Typography>
				<div className="flex gap-4 w-full md:w-auto items-center">
					<Input
						placeholder="Search events..."
						startDecorator={<Search className="h-4 w-4" />}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full md:w-64"
					/>
					<select
						value={filterVenue}
						onChange={(e) => setFilterVenue(e.target.value)}
						className="w-full md:w-48 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="all">All Venues</option>
						{uniqueVenues.map((venue) => (
							<option key={venue} value={venue}>
								{venue}
							</option>
						))}
					</select>
					<Button
						startDecorator={<Plus className="h-4 w-4" />}
						onClick={onCreateEvent}
					>
						New Event
					</Button>
				</div>
			</div>

			{/* Events Table */}
			<Box sx={{ overflow: "auto" }}>
				<Table
					hoverRow
					className="min-w-full"
					sx={{
						"& th": {
							cursor: "pointer",
							"&:hover": {
								backgroundColor:
									"var(--joy-palette-neutral-100, #F5F5F5)",
							},
						},
					}}
				>
					<thead>
						<tr>
							<th onClick={() => requestSort("id")}>
								ID{" "}
								{sortConfig.key === "id" &&
									(sortConfig.direction === "ascending"
										? "↑"
										: "↓")}
							</th>
							<th onClick={() => requestSort("name")}>
								Name{" "}
								{sortConfig.key === "name" &&
									(sortConfig.direction === "ascending"
										? "↑"
										: "↓")}
							</th>
							<th onClick={() => requestSort("organization")}>
								Organization{" "}
								{sortConfig.key === "organization" &&
									(sortConfig.direction === "ascending"
										? "↑"
										: "↓")}
							</th>
							<th onClick={() => requestSort("venue")}>
								Venue{" "}
								{sortConfig.key === "venue" &&
									(sortConfig.direction === "ascending"
										? "↑"
										: "↓")}
							</th>
							<th onClick={() => requestSort("startDate")}>
								Start Date{" "}
								{sortConfig.key === "startDate" &&
									(sortConfig.direction === "ascending"
										? "↑"
										: "↓")}
							</th>
							<th onClick={() => requestSort("endDate")}>
								End Date{" "}
								{sortConfig.key === "endDate" &&
									(sortConfig.direction === "ascending"
										? "↑"
										: "↓")}
							</th>
							<th onClick={() => requestSort("status")}>
								Status{" "}
								{sortConfig.key === "status" &&
									(sortConfig.direction === "ascending"
										? "↑"
										: "↓")}
							</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{getSortedEvents().map((event) => (
							<tr key={event.id}>
								<td>{event.id}</td>
								<td>{event.name}</td>
								<td>{event.organization}</td>
								<td>{event.venue}</td>
								<td>
									{new Date(
										event.startDate
									).toLocaleDateString()}
								</td>
								<td>
									{new Date(
										event.endDate
									).toLocaleDateString()}
								</td>
								<td>{renderStatusChip(event.status)}</td>
								<td>
									<div className="flex gap-2">
										<IconButton
											size="sm"
											variant="plain"
											color="primary"
											aria-label="Edit"
											onClick={() => onUpdateEvent(event)}
										>
											<Edit className="h-4 w-4" />
										</IconButton>
										<IconButton
											size="sm"
											variant="plain"
											color="danger"
											aria-label="Delete"
											onClick={() =>
												onDeleteEvent(event.id || 0)
											}
										>
											<Trash2 className="h-4 w-4" />
										</IconButton>
									</div>
								</td>
							</tr>
						))}
						{getSortedEvents().length === 0 && (
							<tr>
								<td colSpan={8} className="text-center py-4">
									No events found
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</Box>
		</Sheet>
	);
}
