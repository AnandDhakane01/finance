import { proxy } from "../proxy";
import headerFactory from "./api";

const quote = async (symbol) => {
  const headers = headerFactory();
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(symbol),
  };
  try {
    const response = await fetch(`${proxy}/quote`, requestOptions).then((res) =>
      res.json()
    );
    return response;
  } catch (err) {
    console.log("\n", err, "\n");
  }
};

export default quote;
