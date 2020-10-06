import React, { useState } from "react";
import clsx from "clsx";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import Card from "./Card";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90vw",
    overflowX: "hidden",
  },
  typeTitle: {
    margin: theme.spacing(2),
    fontFamily: "Poppins",
  },
  places: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    minHeight: "25ch",
  },
  placesWithTitle: {
    flexWrap: "nowrap",
  },
  place: {
    margin: "auto 30px",
    textAlign: "center",
    color: theme.palette.text.secondary,

    "& img": {
      height: "85%",
      display: "block",
      overflow: "hidden",
      width: "100%",
    },
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
      <Grid item xs={12}>
        <Typography
          variant={"h4"}
          className={clsx(classes.typeTitle, classes.spacing)}
        >
          {props.title}
        </Typography>
      </Grid>
      {pages > 1 ? (
        <Pagination
          count={pages}
          size="small"
          page={currentPage}
          onChange={(e, page) => changePage(page, e)}
        />
      ) : (
        ""
      )}
      <Grid container className={classes.places}>
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
