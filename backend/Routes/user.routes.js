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
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import upload from "../Middlewares/multer.js";

router.route("/signup").post(register);
router.route("/signin").post(login);
router.route("/logout").get(logout);
router.get("/:id", (isAuthenticated, getProfile) );
router.post("/accounts/edit", (isAuthenticated, upload.single("avatar"), editProfile));
router.post("/:id", (isAuthenticated, followandunfollow));
router.get("/suggestions", (isAuthenticated, getSuggestions));

export default router;