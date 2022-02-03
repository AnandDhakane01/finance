import React from "react";

const Portfolio = ({ stocksData }) => {
  return (
    <div className="bg-gray-800 lg:w-4/6 lg:mr-5 lg:rounded-lg py-10 my-5 lg:ml-3">
      <div className="lg:w-5/6 w-full mx-auto overflow-auto">
        <h1 className="text-4xl mb-7 pl-4">Market Positions</h1>
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="text-gray-500  uppercase">
              <th className="px-4 py-5 rounded-tl rounded-bl font-normal">
                Symbol
              </th>
              <th className="px-4 py-5 font-normal">Name</th>
              <th className="px-4 py-5 font-normal">Shares</th>
              <th className="px-4 py-5 font-normal">Price</th>
              <th className="px-4 py-5 font-normal">Total</th>
            </tr>
          </thead>
          <tbody>
            {stocksData &&
              stocksData.map((stock, index) => (
                <tr
                  className={index % 2 === 0 ? "bg-gray-700" : ""}
                  key={index}
                >
                  <td className="px-4 py-5">{stock.stock_symbol}</td>
                  <td className="px-4 py-5">{stock.name}</td>
                  <td className="px-4 py-5">{stock.no_of_shares}</td>
                  <td className="px-4 py-5 text-lg ">${stock.price}</td>
                  <td className="px-4 py-5 text-lg ">
                    ${stock.price * stock.no_of_shares}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;
