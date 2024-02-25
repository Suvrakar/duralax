const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const uploadRoute = require("./routes/upload");
const itemRoute = require("./routes/item");
const globalRoute = require("./routes/globalValue");
const customerRoute = require("./routes/customer");
const itemCategoryRoute = require("./routes/itemCategory");
const proposal = require("./routes/proposal");

const materialRoute = require("./routes/material");
const materialCategoryRoute = require("./routes/materialCategory");

const roleRoutes = require("./routes/role");
const bodyparser = require("body-parser");

const cors = require("cors"); // Import the cors middleware

let bp_key =
  "mongodb+srv://nasrudeen2823:iEPOTSwBC1nhaXCM@cluster0.eqyztsi.mongodb.net/?retryWrites=true&w=majority";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || bp_key);

// Allow all origins, methods, and headers
app.use(
  cors({
    origin: "*",
  })
);

/*assuming an express app is declared here*/
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Use the user and role routes
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
// Use the upload route
app.use("/api/upload", uploadRoute);
// Use the item route
app.use("/api/items", itemRoute);
app.use("/api/global", globalRoute);
app.use("/api/customer", customerRoute);
// Use the category route
app.use("/api/item-category", itemCategoryRoute);
app.use("/api/items", itemRoute);
app.use("/api/material-category", materialCategoryRoute);
app.use("/api/material", materialRoute);
app.use("/api/proposal", proposal);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
