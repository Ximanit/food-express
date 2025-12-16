import express from 'express';

import Order from '../models/Order.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const order = await Order.find();

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
		const order = await Order.findById(req.params.id);

		res.status(200).send(order);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
});

router.post('/', async (req, res) => {
	try {
		const { items, total, address, userId } = req.body;

		if (!items || items.length === 0) {
			return res.status(400).json({ message: 'Корзина пуста' });
		}

		const order = new Order({
			User: userId || null, // если есть авторизация — передавай userId с фронта
			cart: items.map((item) => ({
				name: item.title,
				count: item.quantity,
				price: item.price, // добавляем цену для истории
			})),
			sum: total,
			deliveryAddress: address,
		});

		await order.save();

		res.status(201).json({
			message: 'Заказ успешно оформлен!',
			order: order,
		});
	} catch (error) {
		console.error('Ошибка создания заказа:', error);
		res.status(500).json({ message: 'Ошибка сервера при оформлении заказа' });
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

export default router;
