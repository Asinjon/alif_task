import express from "express";
import dotenv from "dotenv";
import commentsRouter from "./routes/comments.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: process.env.frontend_url
}));
app.use("/api/comments", commentsRouter);

app.listen(port, () => console.log('listening on port ' + port));