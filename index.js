const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.get("/", (req, res) => {
  res.render("index");
});

connectDB();

app.use("/auth", require("./routes/auth"));
app.use("/landingPages", require("./routes/landingPages"));
app.use("/pageBuilder", require("./routes/pageBuilder"));
app.use("/", require("./routes/renderRoutes"));

const hostname = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
  console.log(`Serveur démarré sur http://${hostname}:${port}`);
});
