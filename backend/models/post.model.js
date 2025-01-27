import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    captions: {
        type: String,
    },
    postMedia: {
        type: [String],
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Comment",
    },
    tags: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    visibility: {
        type: String,
        enum: ["public", "private", "followers-only"],
        default: "public",
    },
    location: {
        type: String,
    },
    isPinned: {
        type: Boolean,
        default: false,        
    },
    analytics: {
        views: {
            type: Number,
            default: 0,
        },
        engagementScore: {
            type: Number,
            default: 0,
        },
    }
});

export default mongoose.model("Post", postSchema);