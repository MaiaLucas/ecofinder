import Axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";
import API from "../API";

const Context = createContext();

function AuthProvider({ children }) {
	const [authenticated, setAuthenticated] = useState(false);

	async function handleLogin(body) {
		console.log(body);
		console.log("lucas");
		const { data } = await Axios.post(`${API}/validateToken`, body);
		console.log(data);
		setAuthenticated(true);
	}

	return (
		<Context.Provider value={{ authenticated, handleLogin }}>
			{children}
		</Context.Provider>
	);
}

export { Context, AuthProvider };
