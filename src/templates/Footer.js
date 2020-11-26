import React from "react";
import "../styles/templates/footer.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { IconButton } from "@material-ui/core";

export default () => {
	return (
		<div className="app-footer">
			<IconButton
				component="a"
				target="_blank"
				href="https://github.com/MaiaLucas/ecofinder"
				rel="noopener noreferrer"
				onClick={(e) => {
					return true;
				}}
			>
				<GitHubIcon />
			</IconButton>
			<IconButton
				component="a"
				target="_blank"
				href="https://www.linkedin.com/in/lucas-maia-12722a17b/"
				rel="noopener noreferrer"
				onClick={(e) => {
					return true;
				}}
			>
				<LinkedInIcon onClick={() => console.log("git")} />
			</IconButton>
		</div>
	);
};
