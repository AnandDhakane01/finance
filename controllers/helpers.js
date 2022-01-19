// import fetch from "node-fetch";
const fetch = require("node-fetch");

const lookup = async (symbol) => {
  // Look up quote for symbol.

  const url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.API_KEY}`;
  try {
    const response = await fetch(url).then((res) => res.json());
    // parse response
    res = {
      name: response.companyName,
      price: parseFloat(response.latestPrice).toFixed(2),
      symbol: response.symbol,
    };
    return [null, res];
  } catch (err) {
    console.log("");
    console.log("Error in lookup!!", err);
    console.log("");
    return [err, null];
  }
};

module.exports = { lookup };
