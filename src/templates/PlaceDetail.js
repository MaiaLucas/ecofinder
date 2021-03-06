import React, { useEffect, useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import amongNature from "../assets/img/places_highlights.jpg";
import API from "../API";
import Loading from "./Loading";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { FiClock, FiEdit, FiPhoneCall } from "react-icons/fi";
import clsx from "clsx";
import AuthService from "../services/auth.service";
import Sidebar from "./SideBar";
import "../styles/pages/place-detail.css";

const tutorialSteps = [
	{
		label: "San Francisco – Oakland Bay Bridge, United States",
		imgPath:
			"https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
		cols: 12,
	},
	{
		label: "Bird",
		imgPath:
			"https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
		cols: 5,
	},
	{
		label: "Bali, Indonesia",
		imgPath:
			"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
		cols: 7,
	},
	{
		label: "NeONBRAND Digital Marketing, Las Vegas, United States",
		imgPath:
			"https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60",
		cols: 3,
	},
	{
		label: "Goč, Serbia",
		imgPath:
			"https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
		cols: 9,
	},
];

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
		minHeight: "55vh",
	},
	header: {
		display: "flex",
		alignItems: "center",
		height: 50,
		// paddingLeft: theme.spacing(4),
		backgroundColor: theme.palette.background.default,
	},
	img: {
		height: "100%",
		maxWidth: "100%",
		overflow: "hidden",
		display: "block",
		width: "100%",
	},
	edit: {
		marginLeft: theme.spacing(2),
	},
}));

export default () => {
	const classes = useStyles();
	const { id } = useParams();

	const [isLoaded, setIsLoaded] = useState(false);
	const [arrImages, setArrImages] = useState(tutorialSteps);
	const [objPlace, setObjPlace] = useState({});
	const [activeStep, setActiveStep] = useState(0);
	const [user, setUser] = useState("");

	useEffect(() => {
		(async () => {
			await AuthService.getCurrentUser().then((req, res) => {
				if (req.data) {
					const { id } = AuthService.userInfo();
					setUser(id);
				}
			});
			fetch(`${API}/place/${id}`)
				.then((res) => res.json())
				.then(
					(result) => {
						if (result.images_url) {
							const auxImages = result.images_url
								.split(",")
								.map((image, index) => {
									return {
										label: Math.floor(Math.random() * 99999),
										imgPath: image,
									};
								});
							setArrImages(result.images_url ? auxImages : tutorialSteps);
						}
						setIsLoaded(true);
					},
					(error) => {
						setIsLoaded(false);
					}
				);
		})();
		return () => {};
	}, []);

	if (isLoaded) {
		return (
			<div id="place-detail">
				<Sidebar />
				<main>
					<Grid container className="place-details">
						<img
							className={classes.img}
							src={arrImages[activeStep].imgPath || amongNature}
							alt=""
						/>
						<Grid item xs={6} className="images">
							{arrImages.map((image, index) => {
								return (
									<button
										key={index}
										className={activeStep === index ? "active" : ""}
										type="button"
										onClick={() => {
											setActiveStep(index);
										}}
									>
										<img src={image.imgPath} alt={image.label} />
									</button>
								);
							})}
						</Grid>
						<Grid item xs={10} className="place-details-content">
							<h1>
								{objPlace.title}
								{objPlace.author === user ? (
									<Link className={classes.edit} to={"/place/" + id}>
										<FiEdit size={32} color="#15B6D6" />
									</Link>
								) : (
									""
								)}
							</h1>
							<p>{objPlace.description}</p>
							<hr />
							<h2>Endereço</h2>
							<p>
								{objPlace.address}, {objPlace.city} - {objPlace.state}
							</p>

							<hr />
							<h2>Informações</h2>
							<div className="open-details">
								<div className="hour">
									<FiClock size={32} color="#15B6D6" />
									{objPlace.opening_days}
									<br />
									<Typography variant={"h4"}>
										Das {objPlace.hr_init} até {objPlace.hr_final}
									</Typography>
								</div>
								<div className="open-on-weekends">
									<FiPhoneCall size={32} color="#39CC83" />
									Telefone para contato: <br />
									<Typography variant={"h4"}>{objPlace.phone}</Typography>
								</div>
							</div>
						</Grid>
					</Grid>
				</main>
			</div>
		);
	} else if (!isLoaded) {
		return <Loading />;
	} else {
		return <Redirect to={"/"} />;
	}
};
