const { lookup } = require("./helpers.js");

const quote = async (req, res) => {
  // get the stock data from the API and send the response
  const { symbol } = req.body;

  if (typeof symbol !== "string") {
    return res.status(400).send({ error: true, message: "Invalid symbol" });
  }

  const [err, resp] = await lookup(symbol);
  if (err) {
    return res.status(400).send({ error: true, message: "Invalid symbol" });
  }
  return res.status(200).send(resp);
};

module.exports = { quote };
