import { Box, Button, IconButton, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/templates/register-button.css";

export default (params) => {
	const { push } = useHistory();
	return (
		<div className="app-new-content">
			<label to="btn-new-content" id="btn-title">
				cadastrar local
			</label>
			<IconButton
				className={"btn-new-content"}
				color="inherit"
				size="medium"
				onClick={() => push("/place")}
			>
				<Add />
			</IconButton>
		</div>
	);
};
