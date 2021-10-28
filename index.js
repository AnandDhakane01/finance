const cookieParser = require("cookie-parser");
const express = require("express");
const port = 5000;
const logger = require("morgan");
const cors = require("cors");
var bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const { urlencoded } = require("express");

const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cookieParser());

app.use("/", indexRouter);

app.listen(process.env.PORT || port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
