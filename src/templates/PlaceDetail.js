import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import amongNature from "../assets/img/places_highlights.jpg";
import API from "../API";
import Loading from "./Loading";
import {
  Grid,
  GridList,
  GridListTile,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";

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
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: "55vh",
  },
}));

export default (props) => {
  const classes = useStyles();
  const location = useLocation();
  // const {
  //   location: { objPlace },
  //   match: { params },
  // } = props;

  console.log(location);

  const [isLoaded, setIsLoaded] = useState(true);

  if (isLoaded) {
    return (
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
      </Grid>
    );
  } else if (!isLoaded) {
    return <Loading />;
  } else {
    return <Redirect to={"/"} />;
  }
};
