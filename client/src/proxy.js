let proxy;

if (process.env.ENVIRONMENT === "production") {
  proxy = `https://finance-production.up.railway.app/`;
} else {
  proxy = `https://localhost:${5000}`;
}
