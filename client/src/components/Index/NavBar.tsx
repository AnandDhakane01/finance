import { FC } from "react";
import { Link } from "react-router-dom";

const NavBar: FC = () => {
  return (
    <nav className="relative navbar bg-gray-700 text-white">
      <h3 className="text-xl font-bold absolute inset-y-0 left-10 flex items-center">
        <Link to="/">Finance</Link>
      </h3>
      <div className="flex justify-center">
        <button className="m-5">
          <Link to="/quote">Quote</Link>
        </button>
        <button className="m-5">
          <Link to="/buy"> Buy</Link>
        </button>
        <button className="m-5">
          <Link to="/sell">Sell</Link>
        </button>
        <button className="m-5">History</button>
      </div>
      <div className="profile absolute inset-y-0 flex items-center right-10">
        <h2 className="mr-3 text-lg">Anand</h2>
        <button
          type="button"
          className="bg-gray-800 flex text-sm rounded-full focus:outline-none"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
