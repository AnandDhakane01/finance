import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import IndexMain from "../components/Portfolio";
import SideBar from "../components/SideBar";
import RecentTrade from "../components/RecentTrades";
import getStocksData from "../services/portfolioService";

const Index = () => {
  const [stocksData, setStocksData] = useState();
  const [total, setTotal] = useState();

  // get the holdings data
  useEffect(() => {
    const getData = async () => {
      const response = await getStocksData();
      if (response.error) {
        alert(response.message);
      }
      setStocksData(response);
      console.log(response);
    };
    getData();
  }, []);

  // calculate total protfolio value
  useEffect(() => {
    let total = 0;
    if (stocksData) {
      stocksData.forEach((stock) => {
        total += stock.price * stock.no_of_shares;
      });
    }
    setTotal(parseFloat(total).toFixed(2));
  }, [stocksData]);

  return (
    <>
      <NavBar />
      <div className="flex lg:flex-row flex-col justify-center">
        <IndexMain stocksData={stocksData}></IndexMain>
        <SideBar total={total}></SideBar>
      </div>
      <RecentTrade />
    </>
  );
};

export default Index;
