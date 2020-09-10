export default () => {
  return process.env.API_URL || "http://localhost:4040";
};
