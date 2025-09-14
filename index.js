const express = require("express");
const app = express();
const connectDB = require("./dbConnector");
const cors = require("cors");

require("dotenv").config();
connectDB();

const allowedOrigins = [
  "http://localhost:3000",
  "https://itftsac.vercel.app",
];

app.use(cors());
app.use(cors({
  origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow requests without origin (mobile apps, curl)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  allowedHeaders: ["Content-Type", "authToken"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth"))
app.use("/api/events", require("./routes/events"))
app.use("/api/team", require("./routes/team"))
app.use("/api/results", require("./routes/results"))
app.use("/api/professors", require("./routes/professors"))
app.use("/api/announcements", require("./routes/announcements"))
app.use("/api/students", require("./routes/students"))


app.listen(process.env.PORT, () => {
    console.log(`------------------SERVER IS RUNNING ON PORT ${process.env.PORT}-------------------`);
})