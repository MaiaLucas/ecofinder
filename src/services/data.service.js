import API from "../API";
import authHeader from "./auth-header";

export const getUserBoard = () => {
  return fetch(`${API}/signup`, {
    method: "GET",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.status >= 400) return result.message;

      return result;
    });
};
