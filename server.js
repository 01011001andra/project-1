const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const db = require("./config/db");
const upload = require("express-fileupload");

dotenv.config({ path: `./config/config.env` });

const authRoute = require("./routes/auth");
const pelangganRoute = require("./routes/Pelanggan");

const connectDB = async () => {
  try {
    await db.sync();
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());
app.use(upload());

// router
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/pelanggan", pelangganRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `SERVER IS RUNNING IN MODE ${process.env.NODE_ENV} ON PORT ${process.env.PORT}`
  );
});
