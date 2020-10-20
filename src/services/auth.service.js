import API from "../API";

function logout() {
  localStorage.removeItem("user");
}

async function login(config) {
  return await fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=UTF-8",
      // mode: "cors",
    },
    body: JSON.stringify({
      username: config.username,
      email: config.email,
      password: config.password,
    }),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        if (result.code) {
          return result.message;
        }
        localStorage.setItem("user", JSON.stringify(result));
        return result;
      },
      (error) => {
        console.log("errroooo");
        console.log(error);
        return "Erro! Favor contactar a equipe de suporte";
      }
    );
}

async function register(config) {
  console.log(config);
  return await fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(config),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then(
      (result) => {
        console.log(result);
        if (result.code >= 400 || result.status >= 400) {
          return result.message || result.statusText;
        }

        localStorage.setItem("user", JSON.stringify(result));
      },
      (error) => {
        console.log(error);

        return "Erro! Favor contactar a equipe de suporte";
      }
    );
}

// function validadeToken(token) {}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

function userInfo() {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  return { userId, username, token };
}

export default { login, userInfo, logout, register, getCurrentUser };
