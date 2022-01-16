import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import quote from "../services/quoteService";

const Quote = () => {
  const [lookupData, setLookupData] = useState({});
  const [showQuote, setShowQuote] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const x = await quote(symbol);
    console.log(x);
    setLookupData(x);
    setShowQuote(true);
    return x;
  };

  const handleChange = (event) =>
    setSymbol({
      [event.target.name]: event.target.value,
    });

  const [symbol, setSymbol] = useState({
    symbol: "",
  });

  if (!showQuote) {
    console.log("");
    console.log(showQuote);
    console.log("");
    return (
      <>
        <NavBar />
        <div className="flex justify-center text-center my-20">
          <form action="/quote" method="post">
            <div className="">
              <input
                autoComplete="off"
                autoFocus
                className="bg-gray-800 outline-none border-none p-3 rounded-lg "
                name="symbol"
                placeholder="symbol"
                type="text"
                onChange={handleChange}
              />
            </div>
            <button
              className="mt-4 p-2 rounded-lg bg-blue-400"
              type="submit"
              onClick={handleSubmit}
            >
              Quote
            </button>
          </form>
        </div>

        {/* <footer className="text-sm text-center">
        Data provided for free by &nbsp;
        <a
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://iextrading.com/developer"
        >
          IEX
        </a>
        . View &nbsp;
        <a
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://iextrading.com/api-exhibit-a/"
        >
          IEX’s Terms of Use
        </a>
        .
      </footer> */}
      </>
    );
  } else {
    return <div>{lookupData[symbol]}</div>;
  }
};

export default Quote;
