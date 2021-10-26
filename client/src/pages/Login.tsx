import React from "react";

export default function Login() {
  return (
    <>
      <div className="flex justify-center text-center my-20">
        <form action="/quote" method="post">
          <div className="">
            <input
              autoComplete="off"
              autoFocus
              className="bg-gray-800 outline-none border-none p-3 rounded-lg "
              name="symbol"
              placeholder="Symbol"
              type="text"
            />
          </div>
          <button className="mt-4 p-2 rounded-lg bg-blue-400" type="submit">
            Quote
          </button>
        </form>
      </div>
    </>
  );
}
