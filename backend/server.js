const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");

dotenv.config();
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // your frontend
    credentials: true,
  }),
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

const passport = require("passport");
require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));
