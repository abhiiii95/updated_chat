const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const cookieParser = require("cookie-parser");
const Message_Model = require("./db/models/message");
require("dotenv").config();
require("./db/connection");

const app = express();


app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", require("./routes/userRoute"));


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

let keywords = [
  "Full Stack Developer | React | Node.js | REST APIs | MongoDB",
  "Experienced API Developer | Ready to Join | Node.js | Scalable Backend Systems",
  "API Developer | Node.js | MongoDB | 3 Years Experience | MERN Stack",
  "Backend Developer | Node.js | Express.js | REST APIs | MongoDB | 3 Yrs Exp",
  "Software Engineer (Backend) | Node.js | API Development | Express.js | MongoDB",
  "MERN Stack Developer | Node.js | MongoDB | React.js | API Development"
]