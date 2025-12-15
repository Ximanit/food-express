import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import authRouter from './routes/authRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import { connetDB } from './lib/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);

app.listen(PORT, () => {
	console.log(`server runnig on port ${PORT}`);
	connetDB();
});
