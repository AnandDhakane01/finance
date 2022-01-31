import React, { useState } from "react";
import NavBar from "../components/NavBar";
import quote from "../services/quoteService";
import { useHistory } from "react-router-dom";

const Quote = () => {
  const history = useHistory();
  const [lookupData, setLookupData] = useState();
  const [showQuote, setShowQuote] = useState(false);
  const [symbol, setSymbol] = useState({ symbol: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await quote(symbol);
    if (response.error) {
      alert(response.message);
      history.push("/");
    }
    setLookupData(response);
    setShowQuote(true);
  };

  const handleChange = (event) => {
    setSymbol({
      [event.target.name]: event.target.value,
    });
  };

  if (!showQuote) {
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
  }
  return (
    <>
      <NavBar />
      <div className="justify-center text-center my-20">
        <h1>
          A share of {lookupData.name} costs ${lookupData.price}.
        </h1>
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
};

export default Quote;
