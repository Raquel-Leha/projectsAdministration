import mongoose from "mongoose"


export const connectDB = async () => {
await mongoose.connect('mongodb+srv://rlopezn833:los3pilares@cluster0.khyodqw.mongodb.net/posts')
console.log('MongoDB is connected')
}
