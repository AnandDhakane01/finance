const headerFactory = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    authorization: token ? `Bearer ${token}` : null,
  };
};

export default headerFactory;
