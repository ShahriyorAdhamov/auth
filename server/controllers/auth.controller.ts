import bcryptjs from 'bcryptjs';
import { Request, Response } from "express";
import { User } from "../models/auth.model.js";
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const signup = async (req: Request, res: Response): Promise<void> => {
	const { email, password, name } = req.body as {
		email: string;
		password: string;
		name: string;
	};

	try {
		if (!email || !password || !name) {
			throw new Error("All fields are required");
		}

		const userAlreadyExists = await User.findOne({ email });
		if (userAlreadyExists) {
			res.status(400).json({ success: false, message: "User already exists" });
			return;
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		const user = new User({
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
		});

		await user.save();

		generateTokenAndSetCookie(res, user._id);

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user,
				password: undefined,
			},
		});
	} catch (error: any) {
		res.status(400).json({ success: false, message: error.message || "Something went wrong" });
	}
};


export const login = async (req: Request, res: Response): Promise<void> => {
	res.send('Hello login');
};

export const logout = async (req: Request, res: Response): Promise<void> => {
	res.send('Hello logout');
};
