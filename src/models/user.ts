import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true,'Email is required'],
        match:[
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            'Email is not valid'
        ]
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    fullname:{
        type: String,
        required: [true,'Fullname is required'],
        minLength:[3,'Fullname must be at lest 3 characters'],
        maxLength: [50, 'Fullname must be at most 50 characters']
    }
})

const User = models.User || model('User', userSchema);
export default User;