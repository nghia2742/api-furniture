require('dotenv').config();
const express = require('express');
const route = require('./routes');
const db = require('./app/database/config');
const app = express();
const PORT = process.env.PORT || 5000;

var cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1',
    'https://furniano.vercel.app',
  ],
  credentials: true,
};


// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Connect to router
route.connection(app);

// Connect to DB
db.connect();

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
