// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const salesRoutes = require('./routes/salesRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Enable CORS for cross-origin access (React running separately)
app.use(cors({
    origin: ['http://localhost:5173', 'https://<your-frontend>.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ✅ Serve frontend from build folder
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Catch-all to handle direct route access from browser
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// ✅ Connect to MongoDB
(connectMongo = async () => {
    try {
        const connectDB = await mongoose.connect(process.env.MONGO_ATLAS || 'mongodb+srv://Vrindavan_Nursery:vrindavan123@cluster0.ltxinl4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

        app.listen(PORT);
        if (connectDB) {
            console.log("Connected to the database")
        }

    } catch (error) {
        console.log("Failed to connect the database")
        throw new Error("Failed to connect the database")
    }

})();