const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Below line would serve all files/folders inside of the 'uploads' directory
// And make them accessible through http://localhost:yourport/uploads.
// app.use(express.static(__dirname + '/public'));
// app.use('/uploads', express.static('uploads'));

global.__basedir = __dirname;

const db = require("./models/index.js");

db.sequelize.sync()
  .then(() => {
    console.log("---------------------");
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Abu-Dhabi Plaza Wayfinder application." });
});

require("./routes/stores.routes")(app);
require("./routes/categories.routes.js")(app);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});