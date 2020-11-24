import React, { useState } from "react";
import clsx from "clsx";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import Card from "./Card";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: "100vw",
		overflowX: "hidden",
	},
	typeTitle: {
		margin: theme.spacing(2),
		fontFamily: "Poppins",
	},
	places: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		minHeight: "25ch",
	},
	places2: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "start",
		minHeight: "25ch",
	},
	placesWithTitle: {
		flexWrap: "nowrap",
	},
	place: {
		margin: "24px",
		padding: "12px",
		textAlign: "center",
		color: theme.palette.text.secondary,
		border: "1px solid rgba(0, 0, 0, 0.15)",
		borderRadius: "20px",
		boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.15)",

		"& img": {
			borderRadius: "20px",
			height: "85%",
			display: "block",
			overflow: "hidden",
			width: "100%",
		},
	},
	pagination: {
		paddingLeft: "24px",
		margin: 0,
	},
}));

export default (props) => {
	const classes = useStyles();
	const perPage = props.perPage ? props.perPage : 5;
	const pages = Math.ceil(props.arrPlaces.length / perPage);
	const [currentPage, setCurrentPage] = useState(1);
	const [slicedData, setSlicedData] = useState(
		[...props.arrPlaces].slice(
			(currentPage - 1) * perPage,
			currentPage * perPage
		)
	);

	const changePage = (page, e) => {
		e.preventDefault();
		if (page !== currentPage) {
			setCurrentPage(page);
			setSlicedData(
				[...props.arrPlaces].slice((page - 1) * perPage, page * perPage)
			);
		}
	};

	return (
		<Grid container className={classes.root}>
			<Grid item xs={4}>
				<Typography
					variant={"h4"}
					className={clsx(classes.typeTitle, classes.spacing)}
				>
					{props.title}
				</Typography>
				{pages > 1 ? (
					<Pagination
						count={pages}
						size="small"
						page={currentPage}
						onChange={(e, page) => changePage(page, e)}
						className={classes.pagination}
					/>
				) : (
					""
				)}
			</Grid>
			<Grid container className={pages > 1 ? classes.places : classes.places2}>
				{slicedData.map((place) => {
					return (
						<Grid item xs={2} key={place.id} className={classes.place}>
							<Card config={place} />
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
};
