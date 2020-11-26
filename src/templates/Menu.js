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
	paper: {
		padding: theme.spacing(2),
		margin: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
		height: "100ch",
	},
	highlightsItem: {
		// padding: theme.spacing(2),
		margin: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
		height: "45ch",
		background: "#222",
		"& img": {
			height: "85%",
			display: "block",
			// maxWidth: 400,
			overflow: "hidden",
			width: "100%",
		},
	},
	header: {
		alignItems: "center",
		height: "15%",
		paddingLeft: theme.spacing(4),
		backgroundColor: theme.palette.background.default,
	},
	highlights: {
		justifyContent: "center",
	},
	search: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: "50%",
	},
	navTabs: {
		position: "absolute",
		top: "10%",
		border: "none !important",
		background: "#40916d00",
		width: "500px",
	},
	subheadline: {
		position: "absolute",
		top: "20rem",
		// left: "20%",
		fontWeight: "bold",
		// background: "linear-gradient(116.8deg, #37C77F -41.65%, #00FF3A 99.75%);",
		// backgroundClip: "text",
	},
	headline: {
		position: "absolute",
		top: "30%",
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
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={12}>
					<Paper className={clsx("principal")}>
						<Paper className={classes.navTabs}>
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
						<Typography
							variant={"h1"}
							className={clsx(classes.headline, "headline")}
						>
							<span className="subheadline">
								Tudo que precisa para uma ida sustentável
							</span>
							EcoFinder
						</Typography>
						<Grid container className={classes.search}>
							<Grid item xs={4}>
								<Search />
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				{hasUser && <RegisterButton />}
			</Grid>
			<Footer />
		</div>
	);
}
