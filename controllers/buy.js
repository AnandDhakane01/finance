const Stocks = require("../models/stock");
const { lookup } = require("./helpers");
const User = require("../models/user");

// TODO: figure out a way to validate items in req.body
// TODO: configure logger to log the errors

const buy = async (req, res) => {
  let { symbol, no_of_shares } = req.body;

  console.log(symbol, no_of_shares, !isNaN(no_of_shares));
  // Validate payload
  if (typeof symbol !== "string" || isNaN(no_of_shares) || no_of_shares <= 0) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid symbol/shares" });
  }
  no_of_shares = parseInt(no_of_shares);
  symbol = symbol.toUpperCase();
  let user;
  let stock;

  // quote the stock
  const [err, quote] = await lookup(symbol);
  if (err) {
    return res.status(400).json({ error: true, message: `Invalid Symbol` });
  }
  const amount = no_of_shares * quote.price;

  try {
    // check if the user has sufficient cash
    user = await User.findOne({
      where: { id: req.user.id },
    });

    user = user.dataValues;

    if (user.cash < amount) {
      return res
        .status(400)
        .json({ error: true, message: "Insufficient Funds!!" });
    }

    // check if the user already has shares in his portfolio
    stock = await Stocks.findOne({
      where: { stock_symbol: symbol, user_id: user.id },
    });

    if (stock) {
      // if the stock already exists add to the existing row
      try {
        await Stocks.update(
          { no_of_shares: stock.no_of_shares + no_of_shares },
          { where: { stock_symbol: symbol, user_id: user.id } }
        );
      } catch (err) {
        console.log("there was an error: ", err.message);
      }
    } else {
      // add the stock to the portfolio
      try {
        const _new = await Stocks.create({
          user_id: user.id,
          stock_symbol: symbol,
          no_of_shares,
        });
        await _new.save();
      } catch (err) {
        console.log("there was an error: ", err.message);
      }
    }

    // update cash
    await User.update(
      { cash: parseFloat(user.cash - amount).toFixed(2) },
      { where: { id: user.id } }
    );

    // add to history
    res.status(200).json({
      message: `bought ${no_of_shares} share(s) of ${quote.name} successfully!!`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: `there was an error: ${err.message}` });
  }
};

module.exports = { buy };
