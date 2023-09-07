const mongoose = require('mongoose');
const uri = process.env.DATABASE_URI;
async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connect Successfully!!!');
    } catch (error) {
        console.log('Connect to Database failed!!!');
    }
}

module.exports = { connect };
