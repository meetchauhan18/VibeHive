import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid JSON token" });
        }
        req.id = decoded.id;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Error Occurred" });
    }
};

export default isAuthenticated;