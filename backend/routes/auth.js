import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
	try {
		const { username, email, phone, password } = req.body;

		if (!username || !email || !password || !phone) {
			return res.status(400).json({ message: 'Заполните все поля!' });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: 'Пароль должен быть не менее 6 символов' });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail)
			return res.status(400).json({ message: 'Данная почта уже используется' });

		const existingUsername = await User.findOne({ username });
		if (existingUsername)
			return res
				.status(400)
				.json({ message: 'Данное имя пользователя уже используется' });

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			username,
			email,
			phone,
			password: hashedPassword,
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
	} catch (err) {
		console.log('Ошибка регистрации', err);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ message: 'Неверный email или пароль' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: 'Неверный email или пароль' });

		res.status(200).json({
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (err) {
		console.log('Ошибка авторизации', err);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

export default router;
