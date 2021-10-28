import { proxy } from "../proxy";

const register = async (userName, email, password) => {
  // POST request using fetch inside useEffect React hook
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: userName,
      email: email,
      password: password,
    }),
  };

  try {
    const response = await fetch(`${proxy}/register`, requestOptions);
    return await response.json();
  } catch (err) {
    console.log("");
    console.log(err);
    console.log("");
  }
};

const login = async (userName, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: userName,
      password: password,
    }),
  };
  try {
    const response = await fetch(`${proxy}/login`, requestOptions);
    return await response.json();
  } catch (err) {
    console.log("");
    console.log(err);
    console.log("");
  }
};

export { register, login };
