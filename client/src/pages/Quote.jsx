import React from "react";
import NavBar from "../components/NavBar";

const Quote = () => {
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
            />
          </div>
          <button className="mt-4 p-2 rounded-lg bg-blue-400" type="submit">
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
};

export default Quote;
