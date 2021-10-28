import React from 'react'

const Portfolio = () => {
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
                        </tr>
                    </thead>
                    <tbody>
                        {/* TODO: Got to render multiple of these when the data is fetched */}
                        <tr className="bg-gray-700">
                            <td className="px-4 py-5">Start</td>
                            <td className="px-4 py-5">5 Mb/s</td>
                            <td className="px-4 py-5">15 GB</td>
                            <td className="px-4 py-5 text-lg ">Free</td>
                        </tr>
                        <tr>
                            <td className=" px-4 py-5">Pro</td>
                            <td className=" px-4 py-5">25 Mb/s</td>
                            <td className=" px-4 py-5">25 GB</td>
                            <td className=" px-4 py-5 text-lg ">$24</td>
                        </tr>
                        <tr className="bg-gray-700">
                            <td className=" px-4 py-5">Business</td>
                            <td className=" px-4 py-5">36 Mb/s</td>
                            <td className=" px-4 py-5">40 GB</td>
                            <td className=" px-4 py-5 text-lg ">$50</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-5">Exclusive</td>
                            <td className="px-4 py-5">48 Mb/s</td>
                            <td className="px-4 py-5">120 GB</td>
                            <td className="px-4 py-5 text-lg ">$72</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Portfolio;
