import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/products.route.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}))
const port = process.env.PORT || 5000;
app.use("/api/products", productRoutes)
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend/dist/index.html"));``
    })
}
console.log(process.env.MONGO_URI);

app.listen(port, () => {
    console.log('Server started on port ' + port);
    connectDB()
})