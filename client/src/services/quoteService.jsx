import { proxy } from "../proxy";

const quote = async (symbol) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(symbol),
  };
  try {
    const response = await fetch(`${proxy}/quote`, requestOptions).then((res) =>
      res.json()
    );
    return response;
  } catch (err) {
    console.log("");
    console.log(err);
    console.log("");
  }
};

export default quote;
