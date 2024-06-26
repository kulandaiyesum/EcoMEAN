require("dotenv").config({ path: ".env." + process.env.NODE_ENV.trim() });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

// const corsOptions = require("./config/corsOptions");
const app = express();
const PORT = process.env.PORT;
const { createAdminIfNotExists } = require("./controllers/createAdmin");
const credentials = require("./middleware/credentials");
// const logger = require("./middleware/logEvent");
const { protectRoute } = require("./middleware/verifyJWT.js");
const connectDB = require("./config/dbConn");

connectDB();
// app.use(logger);

app.use(credentials);

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
createAdminIfNotExists();

app.get("/api/test", (req, res) => {
  res.send("API works");
});
app.use("/api", require("./routes/authRoute.js"));
app.use("/api", require("./routes/categoryRoute.js"));
app.use("/api/user", protectRoute, require("./routes/userRoute.js"));
app.use("/api", require("./routes/productRoute.js"));
app.use("/api/contactus", require("./routes/contactUsRoute.js"));
app.use("/api/cart", require("./routes/cartRoute.js"));
app.use("/api/address", require("./routes/addressRoute.js"));
app.use("/api", require("./routes/paymentRoute.js"));

app.use(express.static(path.join(__dirname, "../frontend/dist/browser")));
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend", "dist", "browser", "index.html")
  );
});
mongoose.connection.once("open", () => {
  console.log("Connect to mangoDB");
  app.listen(PORT, () =>
    console.log(
      `Server running on ${process.env.BACK_END_PORT}, ${process.env.NODE_ENV}`
    )
  );
});
