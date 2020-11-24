import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import amongNature from "../assets/img/among_nature.png";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import API from "../API";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: 50,
		// paddingLeft: theme.spacing(4),
		backgroundColor: theme.palette.background.default,
	},
	img: {
		height: 255,
		maxWidth: 400,
		overflow: "hidden",
		display: "block",
		width: "100%",
	},
}));

export default (props) => {
	const info = props.config;

	const [image, setImage] = useState(amongNature);
	useEffect(() => {
		(async () => {
			await Axios.get(`${API}/images/${info.id}`).then((req) => {
				const { images_url } = req.data;

				if (images_url) {
					setImage(images_url.split(",")[0]);
				}
			});
		})();
		return () => {};
	}, []);

	const classes = useStyles();

	return (
		<Link
			to={{
				pathname: "/detail/" + info.id,
			}}
			className="link-place-detail"
		>
			<img className={classes.img} src={image} alt="" />
			<Paper square elevation={0} className={classes.header}>
				<Typography>{info.title}</Typography>
			</Paper>
		</Link>
	);
};
