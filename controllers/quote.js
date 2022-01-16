const { lookup } = require("./helpers.js");

const quote = async (req, res) => {
  // get the stock data from the API and send the response
  const resp = await lookup(req.body.symbol);
  return res.status(200).send(resp);
};

module.exports = { quote };
