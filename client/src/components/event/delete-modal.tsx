"use client";

import { useState } from "react";
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
import { AnimatePresence, motion } from "motion/react";

type DeleteConfirmationModalProps = {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
};

export default function DeleteConfirmationModal({
	open,
	onClose,
	onConfirm,
}: DeleteConfirmationModalProps) {
	const [password, setPassword] = useState("");

	const handleConfirm = () => {
		if (password === "admin") {
			onConfirm();
			setPassword("");
		}
	};

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
							maxWidth: 700,
							width: "100%",
							backgroundColor: "white",
							borderRadius: "8px",
							position: "relative",
							padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
						}}
					>
						<ModalClose />
						<Typography
							id="delete-modal-title"
							level="h2"
							className="text-red-600"
						>
							Confirm Deletion
						</Typography>
						<Divider />
						<Typography
							id="delete-modal-description"
							className="mb-4"
						>
							Are you sure you want to delete this event? This
							action cannot be undone.
						</Typography>
						<FormControl>
							<FormLabel>
								Enter your password to confirm
							</FormLabel>
							<Input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mb-4"
							/>
						</FormControl>
						<Box className="flex gap-2 justify-end">
							<Button
								variant="plain"
								color="neutral"
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button
								variant="solid"
								color="danger"
								onClick={handleConfirm}
							>
								Delete Event
							</Button>
						</Box>
					</motion.div>
				</Modal>
			)}
		</AnimatePresence>
	);
}
