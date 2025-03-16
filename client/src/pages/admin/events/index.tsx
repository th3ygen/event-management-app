"use client";

import { useState } from "react";
import { Typography } from "@mui/joy";
import Sidebar from "@/components/sidebar";
import StatisticsCards from "@/components/event/statistic-cards";
import EventsTable from "@/components/event/events-table";
import DeleteConfirmationModal from "@/components/event/delete-modal";
import EventFormModal, {
	type EventFormData,
} from "@/components/event/event-form-modal";

// Sample data
const initialEvents = [
	{
		id: 1,
		name: "Tech Conference 2023",
		organization: "TechCorp",
		venue: "Convention Center",
		startDate: "2023-11-15",
		endDate: "2023-11-17",
		status: "ongoing",
		image: null,
	},
	{
		id: 2,
		name: "Marketing Summit",
		organization: "Marketing Guild",
		venue: "Grand Hotel",
		startDate: "2023-12-05",
		endDate: "2023-12-07",
		status: "ongoing",
		image: null,
	},
	{
		id: 3,
		name: "Product Launch",
		organization: "Innovate Inc",
		venue: "Tech Hub",
		startDate: "2023-12-15",
		endDate: "2023-12-15",
		status: "completed",
		image: null,
	},
	{
		id: 4,
		name: "Annual Charity Gala",
		organization: "Helping Hands",
		venue: "Luxury Resort",
		startDate: "2024-01-20",
		endDate: "2024-01-20",
		status: "ongoing",
		image: null,
	},
	{
		id: 5,
		name: "Developer Workshop",
		organization: "Code Community",
		venue: "Tech Hub",
		startDate: "2024-02-10",
		endDate: "2024-02-12",
		status: "completed",
		image: null,
	},
] satisfies EventFormData[];

export default function EventsDashboard() {
	const [events, setEvents] = useState<EventFormData[]>(initialEvents);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [eventToDelete, setEventToDelete] = useState<number | null>(null);

	// Event form modal state
	const [formModalOpen, setFormModalOpen] = useState(false);
	const [formMode, setFormMode] = useState<"create" | "update">("create");
	const [currentEvent, setCurrentEvent] = useState<EventFormData | undefined>(
		undefined
	);

	// Handle create event
	const handleCreateEvent = () => {
		setFormMode("create");
		setCurrentEvent(undefined);
		setFormModalOpen(true);
	};

	// Handle update event
	const handleUpdateEvent = (event: EventFormData) => {
		setFormMode("update");
		setCurrentEvent(event);
		setFormModalOpen(true);
	};

	// Handle delete event
	const handleDeleteEvent = (id: number) => {
		setEventToDelete(id);
		setDeleteModalOpen(true);
	};

	// Handle form submission
	const handleFormSubmit = (data: EventFormData) => {
		if (formMode === "create") {
			// Add new event with a new ID
			const newId = Math.max(...events.map((e) => e.id || 0)) + 1;
			setEvents([...events, { ...data, id: newId }]);
		} else {
			// Update existing event
			setEvents(
				events.map((event) =>
					event.id === data.id ? { ...data } : event
				)
			);
		}
		setFormModalOpen(false);
	};

	// Handle delete confirmation
	const handleDeleteConfirm = () => {
		setEvents(events.filter((event) => event.id !== eventToDelete));
		setDeleteModalOpen(false);
	};

	return (
		<div
			className="min-h-screen"
			style={{
				background:
					"linear-gradient(135deg, white 0%, #e6f2ff 50%, #cce6ff 100%)",
			}}
		>
			<Sidebar />

			<div className="pl-[260px] p-6">
				<Typography level="h1" className="mb-6">
					Events Dashboard
				</Typography>

				{/* Statistics Cards */}
				<StatisticsCards events={events} />

				{/* Events Table */}
				<EventsTable
					events={events}
					onCreateEvent={handleCreateEvent}
					onUpdateEvent={handleUpdateEvent}
					onDeleteEvent={handleDeleteEvent}
				/>

				{/* Delete Confirmation Modal */}
				<DeleteConfirmationModal
					open={deleteModalOpen}
					onClose={() => setDeleteModalOpen(false)}
					onConfirm={handleDeleteConfirm}
				/>

				{/* Event Form Modal */}
				<EventFormModal
					open={formModalOpen}
					onClose={() => setFormModalOpen(false)}
					onSubmit={handleFormSubmit}
					mode={formMode}
					initialData={currentEvent}
				/>
			</div>
		</div>
	);
}
