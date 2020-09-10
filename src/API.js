import dotenv from "dotenv";

dotenv.config();

export default () => {
  // console.log(process.env.REACT_APP_STAGE, "teste");
  return process.env.API_URL || "http://localhost:4040";
};
