import mongoose from 'mongoose'
const otpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
})

const otpModel = new mongoose.model('otpDetails', otpSchema)

export default otpModel