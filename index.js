const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = 5000;
const logger = require("morgan");

const indexRouter = require("./routes/index");

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/", indexRouter);

app.listen(process.env.PORT || port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
