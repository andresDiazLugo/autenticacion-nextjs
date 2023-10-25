import mongoose from 'mongoose'

const {MONGODB_URI} = process.env


export const connectDB = async () =>{
    console.log("mostrar variable de entorno",MONGODB_URI)
    if (!MONGODB_URI){
        throw new Error('Please add a Mongo URI')   
    }
    try {
        const {connection} = await mongoose.connect(MONGODB_URI)
        if (connection.readyState === 1){
            console.log("MongoDB connected");
            return Promise.resolve(true);
        }
        
    } catch (error) {
        console.log(error);
    }

};