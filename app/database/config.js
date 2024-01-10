const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://furnitureDB:root@cluster0.ppki6ji.mongodb.net/furniture');
        console.log('Connect to DB OK!');
    } catch (error) {
        console.log(error)
        console.log('Connect to DB failed!');
    }
}

module.exports = { connect };