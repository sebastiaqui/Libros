const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
const config = require("./config");
const db = require("./db");
const passport = require("passport");
const session = require("express-session");

db(config.dbUrl);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("./routes/auth");

app.use(
  session({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/user-route.js"));

app.use("/app", express.static("public"));

server.listen(config.port, function () {
  console.log(`Aplicación escuchando en ${config.host + config.port}`);
});
