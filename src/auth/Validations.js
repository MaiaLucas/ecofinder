function userHasLogged(userId, username, token) {
  localStorage.setItem("userId", userId);
  localStorage.setItem("username", username);
  localStorage.setItem("token", token);

  return true;
}

function userInfo() {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  return { userId, username, token };
}

export { userHasLogged, userInfo };
