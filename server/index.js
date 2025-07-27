require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const khaataRoutes = require('./routes/khaata.routes');
const supplierRoutes = require('./routes/supplier.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

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

// TODO: Add your feature routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));