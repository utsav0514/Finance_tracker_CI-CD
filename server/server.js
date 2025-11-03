import dotenv from "dotenv";
import express from "express";
import { connectdb } from './config/db.js';
import authroutes from './routes/authRoutes.js';
import incomeroutes from './routes/incomeroutes.js';
import expenseroutes from './routes/expenseroutes.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

app.use(express.json());

app.use('/api/auth', authroutes);
app.use('/api/income', incomeroutes);
app.use('/api/expense', expenseroutes);

connectdb().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});

