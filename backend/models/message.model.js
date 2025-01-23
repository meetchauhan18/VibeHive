import mongoose from "mongoose";

const  messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
    },
    media: {
        type: [String],
    },
    isRead:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Message", messageSchema);