import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./database/database.js";
import userRoutes from "./Routes/user.routes.js";

const app = express();
const PORT = process.env.PORT ||3000;

// Middlewares
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/hive", userRoutes);

app.listen(PORT, () => {
    connectDB();
  console.log(`App is listening on port ${PORT}`);
});
