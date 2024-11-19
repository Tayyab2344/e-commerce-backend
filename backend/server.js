import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import ProductRoutes from './routes/product.route.js'

dotenv.config();

const app = express();
app.use(express.json());
const PORT  =process.env.PORT || 3000;

app.use('/api/products', ProductRoutes);
app.listen(PORT, () => {
    connectDB();
    console.log(`Serrver is running on port ${PORT}`);
});
