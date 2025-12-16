import express from 'express';

import Order from '../models/Order';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const order = await Order.find().populate();

		res.status(200).json(order);
	} catch (error) {
		res.status(400).json({
			message: err.message,
		});
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const order = await Order.find({ _id: id });

		res.status(200).send(order);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const newOrder = req.body;

	try {
		await Order.findByIdAndUpdate(id, newOrder);

		const order = await Order.findById(id);
		res.status(200).send(order);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		await Order.findByIdAndDelete(id);

		res.status(200).json({ message: 'Блюдо успешно удалено' });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});
