import { proxy } from "../proxy";

const register = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  try {
    const response = await fetch(`${proxy}/register`, requestOptions);
    const resp = await response.json();
    return resp;
  } catch (err) {
    console.log("");
    console.log(err);
    console.log("");
  }
};

const login = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  try {
    const response = await fetch(`${proxy}/login`, requestOptions);
    const resp = await response.json();
    return resp;
  } catch (err) {
    console.log("");
    console.log(err);
    console.log("");
  }
};

export { register, login };
