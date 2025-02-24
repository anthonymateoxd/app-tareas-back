import mongoose from "mongoose";

export const connectBD = () => {
    try {
        mongoose.connect('mongodb://localhost:27017/Tienda')
        console.log("Connectado :D");
    } catch (error) {   
        console.log('Error', error);
    }
}