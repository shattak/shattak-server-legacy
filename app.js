//shattak api
//express
//dotenv
//morgan Devolepment
//express json Parser
//CORS server configuration
//database
//routes
//Public static files
//frontend static react index
//error handeller

//express
const express = require("express");
const app = express();

//dotenv
require("dotenv").config();

//morgan Devolepment
const morgan = require("morgan");
app.use(morgan("dev"));

// express json Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS server configuration
// var cors = require("cors");
// app.use(cors());

//database
mongoose = require("mongoose");
mongoose.pluralize(null);
mongoose
  .connect("mongodb://localhost:27017/shattak", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(
      "Mongo DB Connection Established " + "\n" + "DB Connected........"
    );
    console.log(
      "---------------------------------------------------------------------\n"
    );
  })
  .catch((errors) => {
    console.log(" Connection Establishment error \n DB NOT Connected...");
    console.log(errors);
  });

//routes api

app.use("/api/authentications",require("./api/routes/authentications"))

// app.use("/api/users",require("./api/routes/users"))
// app.use("/api/notes",require("./api/routes/notes"))



// Public static files
const pub = __dirname.substring(0, __dirname.indexOf("server")) + "public/*";
app.use("/public", express.static(pub));

//frontend static react index
const path = require("path");
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

//error handeller
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

// error handeller
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      massage: error.message,
    },
  });
});

module.exports = app;
