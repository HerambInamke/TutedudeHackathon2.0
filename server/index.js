require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

const supplierRoutes = require('./routes/supplier.routes');
app.use('/api', supplierRoutes);


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