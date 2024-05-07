const express = require("express");
const server = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const testimonialRouter = require("./routes/testimonial");
const cors = require("cors")

// Connection to the database
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/NPTEL_CLONE');
    console.log("Connected to the database");
}

main().catch((err) => {
    console.log(err);
});

// Applying middlewares
server.use(cors());  // Allow all origins
server.use(express.json());
server.use("/user", userRouter.router);
server.use("/course", courseRouter.router);
server.use("/testimonial",testimonialRouter.router);

// Starting the server
server.listen(80, () => {
    console.log("Server is running on port 80");
});
