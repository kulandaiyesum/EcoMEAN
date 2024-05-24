require("dotenv").config({ path: ".env." + process.env.NODE_ENV.trim() });
const express = require("express");
// const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// const corsOptions = require("./config/corsOptions");
const app = express();
const PORT = process.env.PORT;
const { createAdminIfNotExists } = require("./controllers/createAdmin");
const credentials = require("./middleware/credentials");
const logger = require("./middleware/logEvent");
const { protectRoute } = require("./middleware/verifyJWT.js");
const connectDB = require("./config/dbConn");

connectDB();
app.use(logger);

app.use(credentials);

// app.use(
//   cors({
//     origin: "http://localhost:4200",
//     // credentials: true,
//   })
// );
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
createAdminIfNotExists();

app.get("/api/test", (req, res) => {
  res.send("API works");
});
app.use("/api/", require("./routes/authRoute.js"));
app.use("/api/", require("./routes/categoryRoute.js"));
app.use("/api/user", protectRoute, require("./routes/userRoute.js"));
app.use("/api/", require("./routes/productRoute.js"));
app.use("/api/contactus", require("./routes/contactUsRoute.js"));
app.use("/api/cart", require("./routes/cartRoute.js"));

mongoose.connection.once("open", () => {
  console.log("Connect to mangoDB");
  app.listen(PORT, () =>
    console.log(
      `Server running on ${process.env.BACK_END_PORT}, ${process.env.NODE_ENV}`
    )
  );
});
