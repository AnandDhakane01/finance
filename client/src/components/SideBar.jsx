import React from "react";

export default function SideBar({ total, stocksData, valueOfShares }) {
  return (
    <div className="h-full lg:w-auto bg-gray-800 lg:rounded-lg p-10 my-5 mr-3 overflow-hidden lg:ml-3">
      <div>
        <h1 className="text-3xl">Total Value</h1>
        <h1 className="text-blue-400 text-5xl">{total}</h1>
      </div>
      <div className="grid grid-cols-2 gap-10 mt-14">
        <div className="">
          <p className="uppercase text-gray-500">Funds</p>
          <p className="text-xl">
            ${stocksData && parseFloat(stocksData.cash).toFixed(2)}
          </p>
        </div>
        <div className="">
          <p className="uppercase text-gray-500">Value of Shares</p>
          <p className="text-xl">${valueOfShares}</p>
        </div>
        {/* <div className="">
          <p className="uppercase text-gray-500">Total P&L</p>
          <p className="text-xl">$11000</p>
        </div>
        <div className="">
          <p className="uppercase text-gray-500">Anything</p>
          <p className="text-xl">$11000</p>
        </div> */}
        {/* <div className="my-4">
                    <p className="uppercase text-gray-500">Anything</p>
                    <p>$11000</p>
                </div>
                <div className="my-4">
                    <p className="uppercase text-gray-500">Anything</p>
                    <p>$11000</p>
                </div>
                <div className="my-4">
                    <p className="uppercase text-gray-500">Anything</p>
                    <p>$11000</p>
                </div>
                <div className="my-4">
                    <p className="uppercase text-gray-500">Anything</p>
                    <p>$11000</p>
                </div> */}
      </div>
    </div>
  );
}
