"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TextField, Button, Typography } from "@mui/material";
import {
	PersonStandingIcon as Person,
	Lock,
	MailIcon as Email,
} from "lucide-react";

export default function AdminAuthPage() {
	const [activeForm, setActiveForm] = useState<"login" | "register">("login");

	const toggleForm = () => {
		setActiveForm(activeForm === "login" ? "register" : "login");
	};

	return (
		<div
			className="min-h-screen w-full flex items-center justify-center p-4 md:p-8"
			style={{
				background:
					"linear-gradient(135deg, #e0f7fa 0%, #80deea 50%, #4dd0e1 100%)",
			}}
		>
			<AnimatePresence></AnimatePresence>
			<div className="flex w-full max-w-4xl gap-4 justify-center">
				{/* Login Panel */}
				<motion.div
					layout
					className="relative bg-white rounded-xl shadow-xl overflow-hidden"
					style={{
						height: "500px",
						width:
							activeForm === "login"
								? "calc(100% - 70px)"
								: "50px",
						transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
					}}
				>
					{activeForm === "login" ? (
						<div className="absolute inset-0 overflow-hidden">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.3, duration: 0.4 }}
								className="p-8 w-full h-full"
								style={{ width: "400px", minWidth: "100%" }}
							>
								<Typography
									variant="h4"
									component="h1"
									className="mb-6 font-bold text-gray-800"
								>
									Login to your account
								</Typography>

								<form className="space-y-4">
									<div className="flex items-center space-x-2 border-b-2 border-gray-300 py-2">
										<Person
											size={20}
											className="text-gray-500"
											style={{
												transform: "translateY(7px)",
											}}
										/>
										<TextField
											fullWidth
											variant="standard"
											label="Email"
											slotProps={{
												input: {
													disableUnderline: true,
												},
											}}
										/>
									</div>

									<div className="flex items-center space-x-2 border-b-2 border-gray-300 py-2">
										<Lock
											size={20}
											className="text-gray-500"
											style={{
												transform: "translateY(6px)",
											}}
										/>
										<TextField
											fullWidth
											type="password"
											variant="standard"
											label="Password"
											slotProps={{
												input: {
													disableUnderline: true,
												},
											}}
										/>
									</div>

									<div className="flex justify-between items-center pt-4">
										<Typography
											variant="body2"
											className="text-gray-600"
										>
											Forgot password?
										</Typography>
										<Button
											variant="contained"
											className="bg-cyan-600 hover:bg-cyan-700"
										>
											Login
										</Button>
									</div>
								</form>
							</motion.div>
						</div>
					) : (
						<motion.div
							className="h-full flex items-center justify-center cursor-pointer"
							onClick={toggleForm}
						>
							<motion.div
								initial={{ rotate: 0 }}
								animate={{ rotate: 90 }}
								transition={{
									duration: 0.5,
									ease: "easeInOut",
								}}
								style={{ originX: 0.5, originY: 0.5 }}
							>
								<Typography
									variant="h5"
									className="whitespace-nowrap font-bold text-gray-700"
								>
									Login
								</Typography>
							</motion.div>
						</motion.div>
					)}
				</motion.div>

				{/* Register Panel */}
				<motion.div
					layout
					className="relative bg-cyan-50 rounded-xl shadow-xl overflow-hidden"
					style={{
						height: "500px",
						width:
							activeForm === "register"
								? "calc(100% - 70px)"
								: "50px",
						transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
					}}
				>
					{activeForm === "register" ? (
						<div className="absolute inset-0 overflow-hidden">
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.3, duration: 0.4 }}
								className="p-8 h-full"
								style={{ width: "400px", minWidth: "100%" }}
							>
								<Typography
									variant="h4"
									component="h1"
									className="mb-6 font-bold text-gray-800"
								>
									Create an account
								</Typography>

								<form className="space-y-4">
									<div className="flex items-center space-x-2 border-b-2 border-gray-300 py-2">
										<Person
											size={20}
											className="text-gray-500"
											style={{
												transform: "translateY(7px)",
											}}
										/>
										<TextField
											fullWidth
											variant="standard"
											label="Full Name"
											slotProps={{
												input: {
													disableUnderline: true,
												},
											}}
										/>
									</div>

									<div className="flex items-center space-x-2 border-b-2 border-gray-300 py-2">
										<Email
											size={20}
											className="text-gray-500"
											style={{
												transform: "translateY(7px)",
											}}
										/>
										<TextField
											fullWidth
											type="email"
											variant="standard"
											label="Email Address"
											slotProps={{
												input: {
													disableUnderline: true,
												},
											}}
										/>
									</div>

									<div className="flex items-center space-x-2 border-b-2 border-gray-300 py-2">
										<Lock
											size={20}
											className="text-gray-500"
											style={{
												transform: "translateY(6px)",
											}}
										/>
										<TextField
											fullWidth
											type="password"
											variant="standard"
											label="Password"
											slotProps={{
												input: {
													disableUnderline: true,
												},
											}}
										/>
									</div>

									<div className="flex justify-between items-center pt-4">
										<Typography
											variant="body2"
											className="text-gray-600"
										>
											Already have an account?
										</Typography>
										<Button
											variant="contained"
											className="bg-cyan-600 hover:bg-cyan-700"
										>
											Register
										</Button>
									</div>
								</form>
							</motion.div>
						</div>
					) : (
						<motion.div
							className="h-full flex items-center justify-center cursor-pointer"
							onClick={toggleForm}
						>
							<motion.div
								initial={{ rotate: 0 }}
								animate={{ rotate: 90 }}
								transition={{
									duration: 0.5,
									ease: "easeInOut",
								}}
								style={{ originX: 0.5, originY: 0.5 }}
							>
								<Typography
									variant="h5"
									className="whitespace-nowrap font-bold text-gray-700"
								>
									Register
								</Typography>
							</motion.div>
						</motion.div>
					)}
				</motion.div>
			</div>
		</div>
	);
}
