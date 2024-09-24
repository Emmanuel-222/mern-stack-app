import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/products.route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}))
const port = process.env.PORT || 5000;
app.use("/api/products", productRoutes)
console.log(process.env.MONGO_URI);

app.listen(port, () => {
    console.log('Server started on port ' + port);
    connectDB()
})