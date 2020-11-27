import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import AuthService from "../services/auth.service";
import RegisterButton from "./RegisterButton";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	search: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	navTabs: {
		position: "absolute",
		alignSelf: "center",
		justifySelf: "center",
		top: "10%",
		border: "none !important",
		background: "#40916d00",
		width: "500px",
	},
	headline: {
		fontSize: "100px",
		fontWeight: "bold",
		color: "#37C77F",
	},
}));

export default function Menu() {
	let history = useHistory();
	const handleClick = (type) => {
		history.push("/places", { type: type });
	};
	const classes = useStyles();
	const [hasUser, setHasUser] = useState(false);
	useEffect(() => {
		(async () => {
			await AuthService.getCurrentUser().then((req, res) => {
				setHasUser(req.data);
			});
		})();
		return () => {};
	}, []);

	return (
		<div className="principal">
			<Paper className="menu-nav-tabs">
				<Grid container>
					<Grid
						item
						xs={4}
						className="menu-nav-tab"
						onClick={() => handleClick(1)}
					>
						Posto de Coleta
					</Grid>
					<Grid
						item
						xs={4}
						className="menu-nav-tab"
						onClick={() => handleClick(2)}
					>
						Experiências
					</Grid>
					<Grid
						item
						xs={4}
						className="menu-nav-tab"
						onClick={() => handleClick(3)}
					>
						Lojas
					</Grid>
				</Grid>
			</Paper>
			<Typography variant={"h1"} className={clsx(classes.headline, "headline")}>
				<span className="subheadline">
					Tudo que precisa para uma ida sustentável
				</span>
				EcoFinder
			</Typography>
			<Grid container className={classes.search}>
				<Search />
			</Grid>
			{hasUser && <RegisterButton />}
			<Footer />
		</div>
	);
}
