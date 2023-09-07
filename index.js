require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;
const route = require('./routes');
const db = require('./app/database/config');
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(cors());

db.connect()
// ROUTES
//Use router
route(app);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
