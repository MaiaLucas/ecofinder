import Axios from "axios";
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
				return "Erro! Favor contactar a equipe de suporte";
			}
		);
}

async function register(config) {
	return await fetch(`${API}/signup`, {
		method: "POST",
		headers: {
			"Content-type": "application/json;charset=UTF-8",
		},
		body: JSON.stringify({
			username: config.username,
			email: config.email,
			password: config.password,
			confirmPassword: config.password,
		}),
	})
		.then((res) => res.json())
		.then(
			(result) => {
				if (result.status >= 400) {
					return result.message;
				}
				return;
			},
			(error) => {
				return "Erro! Favor contactar a equipe de suporte";
			}
		);
}

async function getCurrentUser() {
	const user = localStorage.getItem("user");
	if (user) return await Axios.post(`${API}/validateToken`, JSON.parse(user));
	else return false;
}

function userInfo() {
	return JSON.parse(localStorage.getItem("user"));
}

export default { login, userInfo, logout, register, getCurrentUser };
