const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const db = require("./config/db");
const upload = require("express-fileupload");

dotenv.config({ path: `./config/config.env` });

const authRoute = require("./routes/auth");
const pelangganRoute = require("./routes/Pelanggan");
const diskonRoute = require("./routes/diskon");
const rekapRoute = require("./routes/rekap");

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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(helmet());
app.use(upload());

// router
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/pelanggan", pelangganRoute);
app.use("/api/v1/diskon", diskonRoute);
app.use("/api/v1/rekap", rekapRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `SERVER IS RUNNING IN MODE ${process.env.NODE_ENV} ON PORT ${process.env.PORT}`
  );
});
