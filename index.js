const cookieParser = require("cookie-parser");
const express = require("express");
const port = 7608;
const logger = require("morgan");
const cors = require("cors");
var bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const app = express();

app.use(cors("https://finance-client-production.up.railway.app"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use("/", indexRouter);

app.listen(process.env.PORT || port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
