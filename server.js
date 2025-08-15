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

// ✅ CORS configuration for production
const corsOptions = {
    origin: [
        'http://localhost:3000', // Local development
        'https://your-frontend-domain.vercel.app', // Replace with your actual frontend URL
        'https://your-frontend-domain.netlify.app', // If using Netlify
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Health check endpoint (useful for hosting platforms)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ✅ Serve frontend from build folder (if you want to serve both from same domain)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Catch-all to handle direct route access from browser
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// ✅ Connect to MongoDB
(connectMongo = async () => {
    try {
        const connectDB = await mongoose.connect(
            process.env.MONGO_ATLAS || 
            'mongodb+srv://Vrindavan_Nursery:vrindavan123@cluster0.ltxinl4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
        )

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
        
        if (connectDB) {
            console.log("Connected to the database")
        }

    } catch (error) {
        console.log("Failed to connect the database:", error)
        process.exit(1);
    }

})();