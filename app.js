/** @format */

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var dotenv = require("dotenv");
const session = require("express-session");
const sequelizeStore = require("connect-session-sequelize");
const db = require("./models/index");

var indexRouter = require("./routes/index");
const authRouter = require("./app/auth/router");
const categoryRouter = require("./app/category/router");
const newsRouter = require("./app/news/router");
const complaintRouter = require("./app/complaint/router");
const problemTypeRouter = require("./app/problem_type/router");
const complaintResultRouter = require("./app/complaintResult/router");
dotenv.config();

var app = express();

const sessionStore = sequelizeStore(session.Store);
const store = new sessionStore({
   db: db.sequelize,
});

app.enable("trust proxy");

app.use(
   session({
      name: "kepo",
      secret: "resiwicaksonoxfitriani",
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
         maxAge: 1000 * 60 * 60 * 24 * 1, // 1 Day
         //  sameSite: "none",
      },
   })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
   cors({
      origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:4173", "https://kagetsapp.vercel.app", "https://kagets-admin.vercel.app"],
      credentials: true,
      optionsSuccessStatus: 200,
   })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", newsRouter);
app.use("/api", complaintRouter);
app.use("/api", problemTypeRouter);
app.use("/api", complaintResultRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = process.env.NODE_ENV === "development" ? err : {};

   // render the error page
   res.status(err.status || 500);
   res.render("error");
});

module.exports = app;
