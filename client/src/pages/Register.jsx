import React, { useState } from "react";
import { register } from "../services/authService";
import { useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Register() {
  const history = useHistory();
  const [formData, setformData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setformData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // verify data
    if (
      formData.userName &&
      formData.email &&
      formData.password &&
      formData.confirmPassword
    ) {
      // authService
      register(formData).then((res) => {
        console.log(res);
      });
      // reset form
      setformData({ userName: "", email: "", password: "" });
      history.push("/login");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center text-center my-20">
        <form onSubmit={handleSubmit}>
          <div className="">
            <input
              autoComplete="off"
              autoFocus
              className="bg-gray-800 outline-none border-none p-3 rounded-lg "
              name="userName"
              placeholder="username"
              type="text"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <input
              autoComplete="off"
              autoFocus
              className="bg-gray-800 outline-none border-none p-3 rounded-lg "
              name="email"
              placeholder="email"
              value={formData.email}
              type="email"
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <input
              autoComplete="off"
              className="bg-gray-800 outline-none border-none p-3 rounded-lg "
              name="password"
              placeholder="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <input
              autoComplete="off"
              className="bg-gray-800 outline-none border-none p-3 rounded-lg "
              name="confirmPassword"
              placeholder="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            className="mt-4 py-2 px-4 rounded-lg bg-blue-400"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}
