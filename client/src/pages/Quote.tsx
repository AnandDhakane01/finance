import React from "react";

const Quote = () => {
    return (
        <div>
            <form action="/quote" method="post">
                <div className="">
                    <input
                        autoComplete="off"
                        autoFocus
                        className=""
                        name="symbol"
                        placeholder="Symbol"
                        type="text"
                    />
                </div>
                <button className="" type="submit">
                    Quote
                </button>
            </form>
            <div className="relative mb-4">
                <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>
        </div>
    );
};

export default Quote;
