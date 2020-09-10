export default () => {
  console.log(process.env.REACT_APP_API_URL);
  return process.env.REACT_APP_API_URL || "http://localhost:4040";
};
