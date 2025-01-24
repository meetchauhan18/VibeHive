import express from "express";
const router = express.Router();
import {
    register,
    login,
    logout,
    followandunfollow,
    getProfile,
    editProfile,
    getSuggestions
} from "../controllers/user.controller.js";
import isAuthenticated from '../middlewares/isAuthenticated.js'; // Ensure the correct path and case
import upload from '../middlewares/multer.js'; // Ensure the correct path and case

router.route("/signup").post(register);
router.route("/signin").post(login);
router.route("/logout").get(logout);
router.get("/:username", isAuthenticated, getProfile); // Apply isAuthenticated middleware
router.post("/accounts/edit", isAuthenticated, upload.single("avatar"), editProfile);
router.post("/:id/profile", isAuthenticated, followandunfollow);
router.get("/suggestions", isAuthenticated, getSuggestions);

export default router;