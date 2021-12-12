import React from "react";
import NavBar from "../components/NavBar";

export default function Sell() {
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
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
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
