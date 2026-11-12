const express = require("express");
const cookieParser = require("cookie-parser")
const authRoutes = require("./Routes/auth.routes");
const postRoutes = require("./Routes/post.routes")

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;