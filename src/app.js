import express from 'express';
import cors from 'cors';
import { customersRouter } from './routes/customer.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  return res.status(200).json({ message: 'Parking App API is running!' });
});

app.use('/api/customers', customersRouter);

export { app };
