import React from "react";
import { Link } from "react-router-dom";
import amongNature from "../assets/img/among_nature.png";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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

  const images = info.images_url ? info.images_url.split(";") : "";

  const classes = useStyles();

  return (
    <Link
      to={{
        pathname: "/detail/" + info.id,
      }}
      className="link-place-detail"
    >
      <img className={classes.img} src={images[0] || amongNature} alt="" />
      <Paper square elevation={0} className={classes.header}>
        <Typography>{info.title}</Typography>
      </Paper>
    </Link>
  );
};
