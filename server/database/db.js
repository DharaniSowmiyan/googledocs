// import mongoose from 'mongoose';

const mongoose = require("mongoose");
const Connection = async () => {
    const URL = `mongodb://Dharani:dharani2911@google-docs-clone-shard-00-00.mxyx3.mongodb.net:27017,google-docs-clone-shard-00-01.mxyx3.mongodb.net:27017,google-docs-clone-shard-00-02.mxyx3.mongodb.net:27017/?ssl=true&replicaSet=atlas-7mcg2d-shard-0&authSource=admin&retryWrites=true&w=majority&appName=google-docs-clone`;
    try {
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error);
    }
}

// export default Connection;
module.exports=Connection;