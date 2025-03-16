"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
	Modal,
	ModalClose,
	Typography,
	Divider,
	FormControl,
	FormLabel,
	Input,
	Button,
	Box,
} from "@mui/joy";
import { Calendar, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type EventFormData = {
	id?: number;
	name: string;
	organization: string;
	venue: string;
	startDate: string;
	endDate: string;
	status: "ongoing" | "completed";
	image?: File | string | null;
};

type EventFormModalProps = {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: EventFormData) => void;
	mode: "create" | "update";
	initialData?: EventFormData;
};

export default function EventFormModal({
	open,
	onClose,
	onSubmit,
	mode,
	initialData,
}: EventFormModalProps) {
	const defaultFormData: EventFormData = {
		name: "",
		organization: "",
		venue: "",
		startDate: new Date().toISOString().split("T")[0],
		endDate: new Date().toISOString().split("T")[0],
		status: "ongoing",
		image: null,
	};

	const [formData, setFormData] = useState<EventFormData>(defaultFormData);
	const [dragActive, setDragActive] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	// Reset form when modal opens/closes or mode changes
	useEffect(() => {
		if (open) {
			if (mode === "update" && initialData) {
				setFormData(initialData);

				// If initialData has an image URL string
				if (typeof initialData.image === "string") {
					setPreviewUrl(initialData.image as string);
				} else {
					setPreviewUrl(null);
				}
			} else {
				setFormData(defaultFormData);
				setPreviewUrl(null);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open, mode, initialData]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	// File handling
	const handleFile = (file: File) => {
		setFormData((prev) => ({ ...prev, image: file }));

		// Create preview URL
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result as string);
		};
		fileReader.readAsDataURL(file);
	};

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFile(e.dataTransfer.files[0]);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			handleFile(e.target.files[0]);
		}
	};

	// Animation variants
	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	const modalVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
			y: 20,
		},
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 300,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.8,
			y: 20,
			transition: {
				duration: 0.2,
			},
		},
	};

	return (
		<AnimatePresence>
			{open && (
				<Modal
					open={open}
					onClose={onClose}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					slotProps={{
						backdrop: {
							sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
						},
					}}
					component={motion.div}
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={overlayVariants}
				>
					<motion.div
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={modalVariants}
						style={{
							maxWidth: 500,
							width: "100%",
							backgroundColor: "white",
							borderRadius: "8px",
							position: "relative",
							padding: "20px",
						}}
					>
						<ModalClose />
						<Typography level="h4">
							{mode === "create"
								? "Create New Event"
								: "Update Event"}
						</Typography>
						<Divider sx={{ my: 2 }} />

						<form onSubmit={handleSubmit}>
							<div className="space-y-4">
								<FormControl required>
									<FormLabel>Event Name</FormLabel>
									<Input
										name="name"
										value={formData.name}
										onChange={handleChange}
										placeholder="Enter event name"
									/>
								</FormControl>

								<FormControl required>
									<FormLabel>Organization</FormLabel>
									<Input
										name="organization"
										value={formData.organization}
										onChange={handleChange}
										placeholder="Enter organization name"
									/>
								</FormControl>

								<FormControl required>
									<FormLabel>Venue</FormLabel>
									<Input
										name="venue"
										value={formData.venue}
										onChange={handleChange}
										placeholder="Enter venue"
									/>
								</FormControl>

								<div className="grid grid-cols-2 gap-4">
									<FormControl required>
										<FormLabel>Start Date</FormLabel>
										<Input
											type="date"
											name="startDate"
											value={formData.startDate}
											onChange={handleChange}
											slotProps={{
												input: {
													min: new Date()
														.toISOString()
														.split("T")[0],
												},
											}}
										/>
									</FormControl>

									<FormControl required>
										<FormLabel>End Date</FormLabel>
										<Input
											type="date"
											name="endDate"
											value={formData.endDate}
											onChange={handleChange}
											slotProps={{
												input: {
													min: formData.startDate,
												},
											}}
										/>
									</FormControl>
								</div>

								<FormControl required>
									<FormLabel>Status</FormLabel>
									<select
										name="status"
										value={formData.status}
										onChange={handleChange}
										className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										<option value="ongoing">Ongoing</option>
										<option value="completed">
											Completed
										</option>
									</select>
								</FormControl>

								<FormControl>
									<FormLabel>Event Image</FormLabel>
									<motion.div
										className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
											dragActive
												? "border-blue-500 bg-blue-50"
												: "border-gray-300"
										}`}
										onDragEnter={handleDrag}
										onDragLeave={handleDrag}
										onDragOver={handleDrag}
										onDrop={handleDrop}
										onClick={() =>
											document
												.getElementById("file-upload")
												?.click()
										}
										whileHover={{ scale: 1.01 }}
										whileTap={{ scale: 0.99 }}
									>
										<input
											id="file-upload"
											type="file"
											accept="image/*"
											onChange={handleFileChange}
											className="hidden"
										/>

										{previewUrl ? (
											<div className="space-y-2">
												<motion.img
													src={
														previewUrl ||
														"/placeholder.svg"
													}
													alt="Preview"
													className="max-h-40 mx-auto object-contain"
													initial={{
														opacity: 0,
														scale: 0.9,
													}}
													animate={{
														opacity: 1,
														scale: 1,
													}}
													transition={{
														duration: 0.3,
													}}
												/>
												<Typography level="body-sm">
													Click or drag to replace
												</Typography>
											</div>
										) : (
											<div className="py-4 space-y-2">
												<motion.div
													animate={{
														y: [0, -5, 0],
													}}
													transition={{
														repeat: Number.POSITIVE_INFINITY,
														repeatType: "reverse",
														duration: 2,
														ease: "easeInOut",
													}}
												>
													<Upload className="h-8 w-8 mx-auto text-gray-400" />
												</motion.div>
												<Typography level="body-sm">
													Drag and drop an image here,
													or click to select
												</Typography>
											</div>
										)}
									</motion.div>
								</FormControl>
							</div>

							<Box
								sx={{
									display: "flex",
									gap: 2,
									justifyContent: "flex-end",
									mt: 3,
								}}
							>
								<Button
									variant="plain"
									color="neutral"
									onClick={onClose}
								>
									Cancel
								</Button>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										type="submit"
										startDecorator={<Calendar />}
									>
										{mode === "create"
											? "Create Event"
											: "Update Event"}
									</Button>
								</motion.div>
							</Box>
						</form>
					</motion.div>
				</Modal>
			)}
		</AnimatePresence>
	);
}
