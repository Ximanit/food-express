import express from 'express';

import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const users = await User.find().populate();

		res.status(200).json(users);
	} catch (error) {
		res.status(400).json({
			message: err.message,
		});
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const user = await User.findById(req.params.id);

		res.status(200).send(user);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const newUser = req.body;

	try {
		await User.findByIdAndUpdate(id, newUser);

		const user = await User.findById(id);
		res.status(200).send(user);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		await User.findByIdAndDelete(id);

		res.status(200).json({ message: 'Пользователь успешно удален' });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

export default router;
