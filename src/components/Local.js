import React, { useState, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import API from "../API";
import Loading from "../templates/Loading";
import clsx from "clsx";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import amongNature from "../assets/img/places_highlights.jpg";
import TYPES from "../constants/types";
import GroupPlace from "../templates/GroupPlace";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  spacing: {
    marginTop: "20ch",
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100ch",
  },
  header: {
    alignItems: "center",
    height: "15%",
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  highlights: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${amongNature})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100vw 100vh",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  places: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50ch",
  },
  typeTitle: {
    width: "74vw",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // margin: theme.spacing(2),
    fontFamily: "Poppins",
    background: "red",
  },
  placesGroup: {
    display: "flex",
    // flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  place: {
    // padding: theme.spacing(2),
    width: "25ch",
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // height: "45ch",
    background: "#292",
    "& img": {
      height: "85%",
      display: "block",
      // maxWidth: 400,
      overflow: "hidden",
      width: "100%",
    },
  },
}));

export default (props) => {
  const classes = useStyles();
  const location = useLocation();
  const params = location.state;

  const type = params.type;
  const local = params.place !== undefined ? params.place : "";

  const pageInfo = [
    {
      headline: local.toUpperCase(),
      subheadline:
        "Aqui você encontrará tudo que precisa em " + local.toUpperCase(),
    },
    {
      headline: "Ache Pontos de Coleta",
      subheadline: "Encontre o posto de coleta perfeito para o seu lixo",
    },
    {
      headline: "Encontre as Melhores Experiências",
      subheadline:
        "Aproveite para dar aquela relaxada com as melhores Ecoaventuras da sua região",
    },
    {
      headline: "Compras Online",
      subheadline: "Aproveite para fazer aquelas Ecocomprinhas",
    },
  ];

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [garbageCollect, setGarbageCollect] = useState([]);
  const [experience, setExperience] = useState([]);
  const [store, setStore] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API}/place${type !== 0 ? "/" + type : ""}/list/${local}`)

      .then((res) => res.json())
      .then(
        (result) => {
          if (result.length && (type || local)) {
            if (local && !type) {
              setGarbageCollect(result[0]);
              setExperience(result[1]);
              setStore(result[2]);
            } else {
              setItems(result);
            }

            setIsLoaded(true);
          } else {
            setRedirect(true);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [local, type]);

  if (error) {
    return <div className="Menu">Error: {error.message}</div>;
  } else if (!isLoaded && !redirect) {
    return <Loading />;
  } else if (isLoaded) {
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={clsx("local-highlights", classes.highlights)}>
              <Typography variant={"h1"}>{pageInfo[type].headline}</Typography>
              <Typography variant={"h4"}>
                {pageInfo[type].subheadline}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container className={classes.places}>
          <Grid item xs={12}>
            <Paper className={classes.placesGroup}>
              {local && !type ? (
                <>
                  {garbageCollect.length ? (
                    <GroupPlace title={TYPES[0]} arrPlaces={garbageCollect} />
                  ) : (
                    ""
                  )}
                  {experience.length ? (
                    <GroupPlace title={TYPES[1]} arrPlaces={experience} />
                  ) : (
                    ""
                  )}
                  {store.length ? (
                    <GroupPlace title={TYPES[2]} arrPlaces={store} />
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <GroupPlace title="" arrPlaces={items} perPage={items.length} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <Redirect to={"/"} />;
  }
};
