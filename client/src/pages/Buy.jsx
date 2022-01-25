import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useHistory } from "react-router-dom";
import buy from "../services/buyService";

export default function Buy() {
  const history = useHistory();
  const [formData, setformData] = useState({ symbol: "", no_of_shares: 0 });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await buy(formData);
    if (response.error) {
      alert(response.message);
    }
    history.push("/");
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center text-center my-20">
        <form action="" method="post">
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
          <div className="mt-4">
            <input
              autoComplete="off"
              className="bg-gray-800 outline-none border-none p-3 rounded-lg "
              name="no_of_shares"
              placeholder="shares"
              type="number"
              onChange={handleChange}
            />
          </div>
          <button
            className="mt-4 py-2 px-4 rounded-lg bg-blue-400"
            type="submit"
            onClick={handleSubmit}
          >
            Buy
          </button>
        </form>
      </div>

      {/* CREDITS TO THE STOCKS DATA API PROVIDER */}

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
