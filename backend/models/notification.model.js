import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  type: {
    type: String,
    enum: ["like", "comment", "share", "follow", "message", "mention"],
  },
  content: {
    type: String,
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  });

export default mongoose.model("Notification", notificationSchema);

