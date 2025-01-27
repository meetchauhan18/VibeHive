import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

     const isUsernameTaken = await User.findOne({ username });
    if(isUsernameTaken){
      return res
        .status(400)
        .json({ message: "Username already exists", success: false });
    }
    
    if(username.length < 3){
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters", success: false });
    }

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 15);
    await User.create({ username, email, password: hashedPassword });
    return res
      .status(200)
      .json({ message: "Account created successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    user = {
      _id: user._id,
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
      followers: user.followers,
      following: user.following,
      posts: user.posts,
    };

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: `Welcome back ${user.username} \n Login successful`,
        success: true,
        user: user,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("token", "")
      .status(200)
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  try {
    // get profile using username
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }
    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    let cloudResponse;
    const { bio, gender } = req.body;
    const avatar = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }
    if (bio) {
      user.bio = bio;
    }
    if (gender) {
      user.gender = gender;
    }
    if (avatar) {
      const fileUri = getDataUri(avatar);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
      user.avatar = cloudResponse.secure_url;
    }

    await user.save();
    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getSuggestions = async (req, res) => {
  try {
    const suggestions = await User.find({ _id: { $ne: req.id } }).select([
      "-password",
    ]);
    if (!suggestions) {
      return res
        .status(400)
        .json({ message: "Currently user's does not exist", success: false });
    }
    return res.status(200).json({ success: true, users: suggestions });
  } catch (error) {
    console.log(error);
  }
};

export const followandunfollow = async (req, res) => {
  try {
    const userId = req.id;
    const followUsername = req.params.username;
    const user = await User.findById(userId).select(["-password"]);
    const followUser = await User.findOne({ username: followUsername }).select([
      "-password",
    ]);
    const followId = followUser._id;

    if (!user || !followUser) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }

    // Debugging statements
    console.log(`userId: ${userId}`);
    console.log(`followId: ${followId}`);

    if (userId.toString() === followId.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot follow yourself", success: false });
    }


    if (
      user.following.includes(followId)
    ) {
      user.following = user.following.filter((id) => id === followId);
      followUser.followers = followUser.followers.filter((id) => id === userId);
      await user.save();
      await followUser.save();
      return res.json({
        currentuser: user.username,
        message: `Unfollowed ${followUser.username} successfully`,
        success: true,
      });
    }
    user.following.push(followId);
    followUser.followers.push(userId);
    await user.save();
    await followUser.save();
    return res.json({
      message: `Followed ${followUser.username} successfully`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
