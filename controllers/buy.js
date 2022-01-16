const Stock = require("../models/stock");
const { lookup } = require("./helpers");

const buy = async (req, res) => {
  const { symbol, no_of_shares } = req.body;
  // quote the stock
  console.log("\n\n\n", req.headers, "\n\n\n");
  console.log("\n\n\n", req.user, "\n\n\n");
  const quote = await lookup(symbol);
  // check if the cash is sufficient

  res.json({ message: "buy" });
  // add stock to portfolio
  // if the stock already exists add to the existing row
  // update the total cash remaining
  // update the portfolio
};

module.exports = { buy };
