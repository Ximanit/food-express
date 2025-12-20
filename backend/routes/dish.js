import express from 'express';
import Dish from '../models/Dish.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const dishes = await Dish.find();
		res.status(200).json(dishes);
	} catch (err) {
		console.error('Ошибка при получении блюд:', err);
		res.status(500).json({ message: 'Ошибка сервера при загрузке блюд' });
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const dish = await Dish.findById(id);
		if (!dish) {
			return res.status(404).json({ message: 'Блюдо не найдено' });
		}
		res.status(200).json(dish);
	} catch (err) {
		console.error('Ошибка при получении блюда:', err);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

router.post('/', async (req, res) => {
	try {
		const { name, compound, category, price, rating } = req.body;

		const dish = new Dish({
			name,
			compound,
			category,
			price,
			rating,
		});

		await dish.save();

		res.status(201).json({
			dish,
		});
	} catch (err) {
		console.log('Ошибка регистрации', err);
		res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже' });
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	try {
		const dish = await Dish.findByIdAndUpdate(id, updates);

		if (!dish) {
			return res.status(404).json({ message: 'Блюдо не найдено' });
		}

		res.status(200).json(dish);
	} catch (err) {
		console.error('Ошибка при обновлении блюда:', err);
		res.status(400).json({ message: err.message || 'Ошибка при обновлении' });
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const dish = await Dish.findByIdAndDelete(id);
		if (!dish) {
			return res.status(404).json({ message: 'Блюдо не найдено' });
		}
		res.status(200).json({ message: 'Блюдо успешно удалено' });
	} catch (err) {
		console.error('Ошибка при удалении блюда:', err);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

export default router;
