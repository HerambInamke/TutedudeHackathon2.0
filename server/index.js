require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const khaataRoutes = require('./routes/khaata.routes');
const supplierRoutes = require('./routes/supplier.routes');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const ratingRoutes = require('./routes/rating.routes');
const orderRoutes = require('./routes/order.routes');
const groupBuyRoutes = require('./routes/groupBuy.routes');

const app = express();

// Environment-based CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON bodies

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/groupbuy', groupBuyRoutes);
app.use('/api', supplierRoutes);
// --- Add your feature routes here ---
// const orderRoutes = require('./routes/order.routes'); // Add this when you build it

app.use('/api', khaataRoutes);
// app.use('/api', orderRoutes);



// DB Connection
mongoose.connect(process.env.MONGO_URI,{family: 4})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error(err));

// Basic Route
app.get('/', (req, res) => {
  res.send('Tutedude Hackathon Backend is Running!');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// TODO: Add your feature routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));