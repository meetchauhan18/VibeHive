import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    authorId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        required:true
    },
    commentLikes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Comment", commentSchema);