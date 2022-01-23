import { proxy } from "../proxy";
import headerFactory from "./api";

const buy = async (data) => {
  const headers = headerFactory();
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${proxy}/buy`, requestOptions).then((res) =>
      res.json()
    );
    return response;
  } catch (err) {
    console.log("\n", err, "\n");
    return { error: true, message: err };
  }
};

export default buy;
