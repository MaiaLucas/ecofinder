import React from "react";
import throwAway from "../assets/img/throw_away.png";
import onlineArticle from "../assets/img/online_article.png";
import amongNature from "../assets/img/among_nature.png";
import Search from "../components/Search";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100ch",
  },
  highlightsItem: {
    // padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "45ch",
    minHeight: "45ch",
    minWidth: "400px",
    background: "#222",
    "& img": {
      height: "85%",
      display: "block",
      // maxWidth: 400,
      overflow: "hidden",
      width: "100%",
    },
  },
  header: {
    alignItems: "center",
    height: "15%",
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  highlights: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  search: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Menu() {
  let history = useHistory();
  const handleClick = (type) => {
    // history.push(`/place/${page}/list`);
    history.push(`/places`, { type: type });
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={clsx("principal")}>
            <Grid container className={clsx(classes.search, "hidden-field")}>
              <Grid item xs={4}>
                <Search />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid container className={clsx(classes.highlights, "menu-highlight")}>
          <Grid item xs={3}>
            <Paper
              className={classes.highlightsItem}
              onClick={() => handleClick(1)}
            >
              <img src={onlineArticle} alt="Headline" />
              <Paper square elevation={0} className={classes.header}>
                <Typography variant="h5">Postos de Coleta</Typography>
              </Paper>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              className={classes.highlightsItem}
              onClick={() => handleClick(2)}
            >
              <img src={throwAway} alt="Headline" />
              <Paper square elevation={0} className={classes.header}>
                <Typography variant="h5">Experiências</Typography>
              </Paper>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              className={classes.highlightsItem}
              onClick={() => handleClick(3)}
            >
              <img src={amongNature} alt="Headline" />
              <Paper square elevation={0} className={classes.header}>
                <Typography variant="h5">Lojas</Typography>
              </Paper>
            </Paper>
          </Grid>
        </Grid>

        {/* <Grid container className={classes.informations}>
          <Grid item xs={9}>
            <Paper className={classes.informationItem}>xs=12</Paper>
          </Grid>
        </Grid> */}
      </Grid>
    </div>
  );
}
