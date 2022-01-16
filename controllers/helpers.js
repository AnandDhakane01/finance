// import fetch from "node-fetch";
const fetch = require("node-fetch");

const lookup = async (symbol) => {
  // Look up quote for symbol.

  const url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.API_KEY}`;
  try {
    const response = await fetch(url).then((res) => res.json());
    // parse response
    return {
      name: response.companyName,
      price: response.latestPrice,
      symbol: response.symbol,
    };
  } catch (err) {
    console.log("");
    console.log("Error in lookup!!", err);
    console.log("");
    return err;
  }
};

module.exports = { lookup };
