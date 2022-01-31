import { proxy } from "../proxy";
import headerFactory from "./api";

const getStocksData = async () => {
  const headers = headerFactory();
  const requestOptions = {
    method: "GET",
    headers: headers,
  };
  try {
    const response = await fetch(`${proxy}/stocks`, requestOptions).then(
      (res) => res.json()
    );
    return response;
  } catch (err) {
    console.log("\n", err, "\n");
  }
};

export default getStocksData;
