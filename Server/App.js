import express from 'express'
import cors from 'cors'
import connectDB from './Src/utils/db.js';
import dotenv from 'dotenv';
import router from './Src/Router/ProjectRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
    origin: 'http://localhost:5173', // Your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    credentials: true // If you need to include cookies
  }));
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use('/', router);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

