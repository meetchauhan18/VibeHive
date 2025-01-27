import sharp from "sharp";
import { Post } from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const postMedia = req.file;
    const { authorId } = req.id;

    if (!caption) {
      return res.status(400).json({ message: "Caption is required" });
    }

    if (!postMedia) {
      return res.status(400).json({ message: "Post media is required" });
    }

    const optimizedImage = await sharp(postMedia.buffer)
      .resize({ width: 600, height: 600, fit: "inside" })
      .toFormat("jpeg")
      .toQuality(80)
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimizedImage.toString(
      "base64"
    )}`;

    const cloudinary = await cloudinary.uploader.upload(fileUri, {
      folder: "social-media-app/posts",
      allowed_formats: ["jpg", "png", "jpeg"],
    });

    const post = await Post.create({
      captions: caption,
      postMedia: cloudinary.secure_url,
      authorId,
    });

    const user = await User.findById(authorId);
    user.posts.push(post._id);
    await user.save();

    await Post.populate(post, { path: "authorId", select: "-password" });

    return res.status(200).json({
      message: "Post created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("authorId", "-password")
      .populate({
        path: "comments",
        options: {
          sort: { createdAt: -1 },
          populate: { path: "authorId", select: "-password" },
        },
      });
    return res.status(200).json({ posts, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ authorId })
      .populate("authorId", "-password")
      .populate({
        path: "comments",
        options: {
          sort: { createdAt: -1 },
          populate: { path: "authorId", select: "-password" },
        },
      });
    return res.status(200).json({ posts, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params.id;
    const { userId } = req.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(userId)) {
        post.likes = post.likes.filter((like) => like.toString() !== userId);
        return res.status(200).json({ message: "Post unliked successfully", success: true });
    } else {
        post.likes.push(id);
    }

    await post.save();

    await Post.populate(post, { path: "authorId", select: "-password" });

    return res.status(200).json({ message: "Post liked successfully", success: true });
  } catch (error) {
    console.log(error);
    }
};
