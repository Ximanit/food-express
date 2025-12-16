import express from 'express';

import Dish from '../models/Dish.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const dish = await Dish.find().populate();

		res.status(200).json(dish);
	} catch (error) {
		res.status(400).json({
			message: err.message,
		});
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const dish = await Dish.find({ _id: id });

		res.status(200).send(dish);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const newDish = req.body;

	try {
		await Dish.findByIdAndUpdate(id, newDish);

		const dish = await Dish.findById(id);
		res.status(200).send(dish);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		await Dish.findByIdAndDelete(id);

		res.status(200).json({ message: 'Блюдо успешно удалено' });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});
