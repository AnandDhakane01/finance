import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { sell, getStocksList } from "../services/sellService";

export default function Sell() {
  const [stocksList, setStocksList] = useState();

  useEffect(async () => {
    const response = await getStocksList();
    setStocksList(response);
    console.log(response);
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex justify-center text-center my-20">
        <form className="">
          <div className="flex items-center justify-center">
            <span className="mr-2">Symbol</span>
            <div className="relative">
              <select className="bg-gray-800 rounded border appearance-none outline-none border-none py-2 text-base px-5">
                <option disabled selected>
                  Select
                </option>
                {stocksList &&
                  stocksList.stocks.map((st) => <option>{st}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <input
              autoComplete="off"
              className="bg-gray-800 outline-none border-none p-3 rounded-lg "
              name="shares"
              placeholder="shares"
              type="text"
            />
          </div>
          <button
            className="mt-4 py-2 px-4 rounded-lg bg-blue-400"
            type="submit"
          >
            Sell
          </button>
        </form>
      </div>
    </>
  );
}
