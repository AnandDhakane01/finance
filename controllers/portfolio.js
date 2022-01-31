const Stock = require("../models/stock");
const { lookup } = require("./helpers");

const getStocksData = async (req, res) => {
  try {
    let data = (await Stock.findAll({ where: { user_id: req.user.id } })).map(
      (s) => s.dataValues
    );

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
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: true, message: err });
  }
};

module.exports = { getStocksData };
