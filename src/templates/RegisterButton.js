import { Box, Button, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	newContent: {
		position: "absolute",
		bottom: "100px",
		right: "100px",
		background: "#00FF19",
		borderRadius: "20px",
		height: "60px",
		width: "60px",
		display: "flex",
		color: "#f9f9f9",
		justifyContent: "center",
		alignItems: "center",
	},
}));

export default (params) => {
	const { push } = useHistory();
	const classes = useStyles();
	return (
		<Box className={classes.newContent}>
			<Button color="inherit" size="large" onClick={() => push("/place")}>
				<Add />
			</Button>
		</Box>
	);
};
