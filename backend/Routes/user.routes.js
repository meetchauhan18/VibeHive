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
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../middlewares/multer.js';

router.route("/signup").post(register);
router.route("/signin").post(login);
router.route("/logout").get(isAuthenticated,logout);
router.get("/:username", isAuthenticated, getProfile);
router.post("/accounts/edit", isAuthenticated, upload.single("avatar"), editProfile);
router.get("/user/suggestions", isAuthenticated, getSuggestions);
router.post("/:username", isAuthenticated, followandunfollow);


export default router;