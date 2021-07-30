const express = require("express");
const cors = require("cors");
const { middleware } = require("./auth/auth");

//Starting
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config({ path: "src/.env" });
app.use(cors());
app.use(middleware);

//port
const port = process.env.PORT || 5000;

//Routes
app.use("/api", require("./routes/Routes"));

//Listenings
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
