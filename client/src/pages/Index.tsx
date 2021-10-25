import IndexMain from "../components/Index/Portfolio";
import SideBar from "../components/Index/SideBar";
import RecentTrade from "../components/Index/RecentTrades";

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
