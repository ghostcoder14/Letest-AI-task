import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import booksRouter from '../routes/books.route.js'
import userRouter from '../routes/user.route.js'


const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/test", (req, res) => res.send("✅ Server is up!"));
app.use("/user", userRouter);
app.use("/books", booksRouter);

export default app 