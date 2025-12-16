import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import dishRouter from './routes/dish.js';
import orderRouter from './routes/order.js';

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/dish', dishRouter);
app.use('/api/order', orderRouter);

const start = async () => {
	try {
		await mongoose.connect(DB_URI).then(console.log('database connection'));
		app.listen(PORT, () => console.log(`server started on port ${PORT}`));
	} catch (error) {
		console.log(error);
	}
};

start();
