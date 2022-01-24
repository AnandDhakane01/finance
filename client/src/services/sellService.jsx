import { proxy } from "../proxy";
import headerFactory from "./api";

const sell = async (data) => {
  const headers = headerFactory();
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${proxy}/sell`, requestOptions).then((res) =>
      res.json()
    );
    return response;
  } catch (err) {
    return { error: true, message: err };
  }
};

const getStocksList = async (data) => {
  const headers = headerFactory();
  const requestOptions = {
    method: "GET",
    headers: headers,
  };
  try {
    const response = await fetch(`${proxy}/sell`, requestOptions).then((res) =>
      res.json()
    );
    return response;
  } catch (err) {
    return { error: true, message: err };
  }
};

export { sell, getStocksList };
