import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
  connectDB();
});
