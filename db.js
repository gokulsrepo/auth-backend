const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const connectDb = async () => {
try {
    await mongoose.connect(process.env.mongodbUrl);
    console.log("connected to database");
} catch (error){
    console.log(error)
}
}

module.exports = connectDb;