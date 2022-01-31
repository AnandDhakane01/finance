import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useHistory } from "react-router-dom";
import { sell, getStocksList } from "../services/sellService";

export default function Sell() {
  const history = useHistory();
  const [stocksList, setStocksList] = useState();
  const [formData, setformData] = useState({ symbol: "", no_of_shares: 0 });

  useEffect(() => {
    const getData = async () => {
      const response = await getStocksList();
      setStocksList(response);
    };
    getData();
  }, []);

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sell(formData);
    if (response.error) {
      alert(response.message);
    }
    history.push("/");
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center text-center my-20">
        <form className="">
          <div className="flex items-center justify-center">
            <span className="mr-2">Symbol</span>
            <div className="relative">
              <select
                className="bg-gray-800 rounded border appearance-none outline-none border-none py-2 text-base px-5"
                name="symbol"
                onChange={handleChange}
              >
                <option disabled selected>
                  Select
                </option>
                {stocksList &&
                  stocksList.stocks.map((st, index) => (
                    <option key={index}>{st}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <input
              autoComplete="off"
              className="bg-gray-800 outline-none border-none p-3 rounded-lg "
              name="no_of_shares"
              placeholder="no_of_shares"
              type="number"
              onChange={handleChange}
            />
          </div>
          <button
            className="mt-4 py-2 px-4 rounded-lg bg-blue-400"
            type="submit"
            onClick={handleSubmit}
          >
            Sell
          </button>
        </form>
      </div>
    </>
  );
}
