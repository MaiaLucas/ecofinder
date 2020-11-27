import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import Card from "./Card";
import "../styles/templates/group-place.css";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
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
}));

export default (props) => {
	const classes = useStyles();
	const [perPage, setPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState(
		Math.ceil(props.arrPlaces.length / perPage)
	);
	const [slicedData, setSlicedData] = useState(
		[...props.arrPlaces].slice(
			(currentPage - 1) * perPage,
			currentPage * perPage
		)
	);

	const [isLoaded, setIsLoaded] = useState(false);
	const changePage = (page, e) => {
		e.preventDefault();
		if (page !== currentPage) {
			setCurrentPage(page);
			setSlicedData(
				[...props.arrPlaces].slice((page - 1) * perPage, page * perPage)
			);
		}
	};

	useEffect(() => {
		if (window.innerWidth < 800) {
			setPerPage(1);
			setPages(Math.ceil(props.arrPlaces.length / 1));

			setSlicedData(
				[...props.arrPlaces].slice((currentPage - 1) * 1, currentPage * 1)
			);
		}

		setIsLoaded(true);
		return () => {};
	}, []);

	if (isLoaded) {
		return (
			<div id="page-group-list">
				<Typography variant={"h4"}>{props.title}</Typography>
				{pages > 1 ? (
					<Pagination
						count={pages}
						size="small"
						page={currentPage}
						onChange={(e, page) => changePage(page, e)}
						className="pagination"
					/>
				) : (
					""
				)}
				<div className={pages > 1 ? "place-start" : "place-center"}>
					{slicedData.map((place) => {
						return (
							<div key={place.id} className="place">
								<Card config={place} />
							</div>
						);
					})}
				</div>
			</div>
		);
	} else {
		return <Loading />;
	}
};
