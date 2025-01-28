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
      return res
        .status(200)
        .json({ message: "Post unliked successfully", success: true });
    } else {
      post.likes.push(userId);
    }

    await post.save();

    await Post.populate(post, { path: "authorId", select: "-password" });

    return res
      .status(200)
      .json({ message: "Post liked successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params.id;
    const { userId } = req.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      postId,
      authorId: userId,
      content: req.body.content,
    });

    post.comments.push(comment._id);
    await post.save();

    await Comment.populate(comment, { path: "authorId", select: "-password" });

    return res
      .status(200)
      .json({ message: "Comment added successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId.toString() !== req.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);

    //delete your own post from user posts array
    const user = await User.findById(post.authorId);
    user.posts = user.posts.filter((post) => post.toString() !== postId);
    await user.save();

    //delete your own post from post comments array
    await Comment.deleteMany({ postId });

    await Post.populate(post, { path: "authorId", select: "-password" });

    return res
      .status(200)
      .json({ message: "Post deleted successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params.id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.authorId.toString() !== req.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });
    }

    //delete your own comment from post comments array
    const post = await Post.findById(comment.postId);
    post.comments = post.comments.filter(
      (comment) => comment.toString() !== commentId
    );
    await post.save();

    //delete your own comment from comment replies array
    await Comment.deleteMany({ parentId: commentId });

    await Comment.findByIdAndDelete(commentId);

    return res
      .status(200)
      .json({ message: "Comment deleted successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId.toString() !== req.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
    }

    post.content = req.body.content;
    await post.save();

    //update your own post from user posts array
    const user = await User.findById(post.authorId);
    user.posts = user.posts.map((post) => {
      if (post.toString() === postId) {
        return post;
      } else {
        return post;
      }
    });
    await user.save();

    //update your own post from post comments array
    await Comment.updateMany({ postId }, { content: req.body.content });

    return res
      .status(200)
      .json({ message: "Post updated successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params.id;
    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .populate("authorId", "-password");

    if (!comments) {
      return res.status(404).json({ message: "Comments not found" });
    }
    return res.status(200).json({ comments, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentReplies = async (req, res) => {
  try {
    const { commentId } = req.params.id;
    const replies = await Comment.find({ parentId: commentId })
      .sort({ createdAt: -1 })
      .populate("authorId", "-password");

    if (!replies) {
      return res.status(404).json({ message: "Replies not found" });
    }
    return res.status(200).json({ replies, success: true });
  } catch (error) {
    console.log(error);
  }
};

