import express from 'express';

import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
	try {
		const { username, email, phone, password } = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({ message: 'Заполните все поля!' });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: 'Пароль должен быть нее менее 6 символов' });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ message: 'Данная почта уже используется' });
		}

		const existingUsername = await User.findOne({ username });
		if (existingUsername) {
			return res
				.status(400)
				.json({ message: 'Данное имя пользователя уже используется' });
		}

		const user = new User({
			username,
			email,
			phone,
			password,
		});

		await user.save();

		res.status(201).json({
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				phone: user.phone,
			},
		});
	} catch (error) {
		console.log('Ошибка регистрации', error);
		res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже' });
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'Заполните все поля!' });
		}

		const user = User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: 'Пользователь с таким логином не найден' });
		}

		const isPasswordCorrect = await user.comparePassord(password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: 'Пароль неправильный' });
		}

		res.status(200).json({
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		console.log('Ошибка авторизации', error);
		res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже' });
	}
});

export default router;
