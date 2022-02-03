const Stock = require("../models/stock");
const { lookup } = require("./helpers");
const User = require("../models/user");

const getStocksData = async (req, res) => {
  try {
    let data = (await Stock.findAll({ where: { user_id: req.user.id } })).map(
      (s) => s.dataValues
    );

    let user = (
      await User.findOne(
        { attributes: ["userName", "email", "cash"] },
        { where: { id: req.user.id } }
      )
    ).dataValues;

    //   get price and name for each stock
    data = await Promise.all(
      data.map(async (stock) => {
        const [err, quote] = await lookup(stock.stock_symbol);
        if (err) {
          console.log(err);
        }
        return {
          ...stock,
          name: quote.name,
          price: quote.price,
        };
      })
    );
    return res.status(200).json({ ...user, data });
  } catch (err) {
    return res.status(500).json({ error: true, message: err });
  }
};

module.exports = { getStocksData };
