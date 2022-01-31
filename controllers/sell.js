const Stocks = require("../models/stock");
const { lookup } = require("./helpers");
const User = require("../models/user");

// sell post
const sell = async (req, res) => {
  let { symbol, no_of_shares } = req.body;

  // validate payload
  if (
    typeof symbol !== "string" ||
    isNaN(no_of_shares) ||
    parseInt(no_of_shares) <= 0
  ) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid symbol/shares" });
  }

  no_of_shares = parseInt(no_of_shares);
  symbol = symbol.toUpperCase();
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
      shares_in_portfolio.no_of_shares - no_of_shares != 0
        ? await Stocks.update(
            {
              no_of_shares: shares_in_portfolio.no_of_shares - no_of_shares,
            },
            {
              where: {
                stock_symbol: symbol,
                user_id: req.user.id,
              },
            }
          )
        : await Stocks.destroy({
            where: {
              stock_symbol: symbol,
              user_id: req.user.id,
            },
          });

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
    return res
      .status(400)
      .json({ error: true, message: "Insufficient shares!!" });
  }
};

// sell get
const sellGet = async (req, res) => {
  try {
    const stocks = (
      await Stocks.findAll({
        where: { user_id: req.user.id },
      })
    ).map((stock) => stock.dataValues.stock_symbol);

    return res.status(200).json({ stocks });
  } catch (err) {
    return res.status(500).json({ error: true, message: `${err}` });
  }
};

module.exports = { sell, sellGet };
