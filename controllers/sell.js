const Stocks = require("../models/stock");
const { lookup } = require("./helpers");
const User = require("../models/user");

const sell = async (req, res) => {
  // symbol
  // no_of_shares
  const { symbol, no_of_shares } = req.body;
  let user;
  let shares_in_portfolio;

  // quote symbol
  const [err, quote] = await lookup(symbol);
  if (err) {
    return res
      .status(400)
      .json({ error: true, message: `Invalid Symbol ${err}` });
  }

  // check if it exists in the users portfolio
  try {
    user = await User.findOne({
      where: { id: req.user.id },
    });

    shares_in_portfolio = (
      await Stocks.findOne({
        where: { stock_symbol: symbol, user_id: user.id },
      })
    ).dataValues;
  } catch (err) {
    return res.status(500).json({ error: true, message: err });
  }

  // update stocks
  if (no_of_shares <= shares_in_portfolio.no_of_shares) {
    try {
      await Stocks.update(
        {
          no_of_shares: shares_in_portfolio.no_of_shares - no_of_shares,
        },
        {
          where: {
            stock_symbol: symbol,
            user_id: req.user.id,
          },
        }
      );

      // update cash
      await User.update(
        {
          cash: parseFloat(user.cash + no_of_shares * quote.price).toFixed(2),
        },
        {
          where: { id: user.id },
        }
      );
      return res.status(200).json({ message: "success" });
    } catch (err) {
      return res.status(500).json({ error: true, message: err });
    }
  } else {
    return res.status(400).json({ message: "Insufficient shares!!" });
  }
};

module.exports = { sell };