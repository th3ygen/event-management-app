"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TextField, Button, Typography } from "@mui/material";
import {
	PersonStandingIcon as Person,
	Lock,
	MailIcon as Email,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	loginSchema,
	LoginSchemaType,
	registerSchema,
	RegisterSchemaType,
} from "@/schemas/auth.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";

export default function AdminAuthPage() {
	const [activeForm, setActiveForm] = useState<"login" | "register">("login");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchemaType | RegisterSchemaType>({
		resolver:
			activeForm === "login"
				? zodResolver(loginSchema)
				: zodResolver(registerSchema),
	});

	const loginMutation = useMutation({
		mutationFn: async (data: LoginSchemaType) => {
			const response = await fetch("/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Login failed");
			}

			return response.json();
		},
		onSuccess: (data) => {
			// Handle successful login (e.g., store tokens, redirect)
			console.log("Login successful:", data);
		},
		onError: (error) => {
			// Handle login error (e.g., show error message)
			console.error("Login error:", error);
		},
	});
	const registerMutation = useMutation({
		mutationFn: async (data: RegisterSchemaType) => {
			const response = await fetch("/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: data.email,
					password: data.password,
				}),
			});

			if (!response.ok) {
				throw new Error("Register failed");
			}

			return response.json();
		},
		onSuccess: (data) => {
			// Handle successful register (e.g., store tokens, redirect)
			console.log("Register successful:", data);
		},
		onError: (error) => {
			// Handle register error (e.g., show error message)
			console.error("register error:", error);
		},
	});

	const handleLoginSubmit: SubmitHandler<LoginSchemaType> = (data) => {
		loginMutation.mutate(data);
	};

	const handleRegisterSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
		registerMutation.mutate(data);
	};

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
						<LoginForm />
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
						<RegisterForm />
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
