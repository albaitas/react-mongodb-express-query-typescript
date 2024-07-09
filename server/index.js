import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
connectDB();

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
app.use('/', productRoutes);
