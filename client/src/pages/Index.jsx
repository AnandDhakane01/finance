import React from "react";
import IndexMain from "../components/Portfolio";
import SideBar from "../components/SideBar";
import RecentTrade from "../components/RecentTrades";

const Index = () => {
  return (
    <>
      <div className="flex lg:flex-row flex-col justify-center">
        <IndexMain></IndexMain>
        <SideBar></SideBar>
      </div>
      <RecentTrade />
    </>
  );
};

export default Index;
