require("dotenv").config({ path: ".env." + process.env.NODE_ENV.trim() });
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const app = express();
const PORT = process.env.PORT;
const { createAdminIfNotExists } = require("./controllers/createAdmin");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const logger = require("./middleware/logEvent");
const verifyJwt = require("./middleware/verifyJWT.js");

const connectDB = require("./config/dbConn");
// const router = express.Router();

connectDB();
app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

// buit - in middleware to handle urlencoded
app.use(express.urlencoded({ extended: false }));

// built-in middlieware for json
app.use(express.json());

createAdminIfNotExists();

app.get("/", (req, res) => {
  res.send("API works");
});
app.use("/", require("./routes/authRoute.js"));
app.use("/", require("./routes/categoryRoute.js"));
app.use("/user", verifyJwt, require("./routes/userRoute.js"));
app.use("/", require("./routes/productRoute.js"));
app.use("/contactus", require("./routes/contactUsRoute.js"));

mongoose.connection.once("open", () => {
  console.log("Connect to mangoDB");
  app.listen(PORT, () =>
    console.log(
      `Server running on ${process.env.BACK_END_PORT}, ${process.env.NODE_ENV}`
    )
  );
});
