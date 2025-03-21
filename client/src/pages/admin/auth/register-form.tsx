import { registerSchema, RegisterSchemaType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PersonStandingIcon as Person, Lock } from "lucide-react";
import toast from "react-hot-toast";

const SERVER_URL = `http://localhost:3000`;

export default function RegisterForm() {
	const mutation = useMutation({
		mutationFn: async (data: RegisterSchemaType) => {
			const response = await fetch(SERVER_URL + "/auth/register", {
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

			toast.success("Register successful");
		},
		onError: (error) => {
			// Handle register error (e.g., show error message)
			console.error("register error:", error);

			if (error instanceof Error) {
				toast.error(error.message);
			}
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterSchemaType>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
		mutation.mutate(data);
	};

	return (
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

				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex items-center space-x-2 border-b-2 border-gray-300 py-2">
						<Person
							size={20}
							className="text-gray-500"
							style={{ transform: "translateY(7px)" }}
						/>
						<TextField
							fullWidth
							variant="standard"
							label="Email"
							{...register("email")}
							slotProps={{ input: { disableUnderline: true } }}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
					</div>

					<div className="flex items-center space-x-2 border-b-2 border-gray-300 py-2">
						<Lock
							size={20}
							className="text-gray-500"
							style={{ transform: "translateY(6px)" }}
						/>
						<TextField
							fullWidth
							type="password"
							variant="standard"
							label="Password"
							{...register("password")}
							slotProps={{ input: { disableUnderline: true } }}
							error={!!errors.password}
							helperText={errors.password?.message}
						/>
					</div>

					<div className="flex items-center space-x-2 border-b-2 border-gray-300 py-2">
						<Lock
							size={20}
							className="text-gray-500"
							style={{ transform: "translateY(6px)" }}
						/>
						<TextField
							fullWidth
							type="password"
							variant="standard"
							label="Confirm Password"
							{...register("confirmPassword")}
							slotProps={{ input: { disableUnderline: true } }}
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword?.message}
						/>
					</div>

					<Button
						variant="contained"
						className="bg-cyan-600 hover:bg-cyan-700"
						type="submit"
						disabled={mutation.isPending}
					>
						Register
					</Button>
				</form>
			</motion.div>
		</div>
	);
}
