import mongoose from "mongoose";

let isConnected = false;

export const connectToDataBase = async() => {
    mongoose.set("strictQuery", true);

    if(isConnected) {
        console.log("MongoDB está conectado");
        return
    }
    
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`, {
            dbName: "breaking_news"
        })

        isConnected = true;
        console.log("MongoDB conectado!");
    } catch (error) {
        console.log(error);
    }
}