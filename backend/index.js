import express from 'express';
import 'dotenv/config';

import authRouter from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

app.use(express.json());

app.use('/api/auth', authRouter);

const start = async () => {
	try {
		await mongoose.connect(DB_URI).then(console.log('database connection'));
		app.listen(PORT, () => console.log(`server started on port ${PORT}`));
	} catch (error) {
		console.log(error);
	}
};

start();
