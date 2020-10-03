import React, { useState, useEffect, Fragment } from "react";
import { Redirect, useLocation } from "react-router-dom";
import Card from "../templates/Card";
import API from "../API";
import Loading from "../templates/Loading";
import clsx from "clsx";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import amongNature from "../assets/img/places_highlights.jpg";
import TYPES from "../constants/types";

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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // margin: theme.spacing(2),
    background: "red",
  },
  placesGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  place: {
    // padding: theme.spacing(2),
    width: "25%",
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // height: "45ch",
    background: "#222",
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
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API}/place${type !== 0 ? "/" + type : ""}/list/${local}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.length && (type || local)) {
            setIsLoaded(true);
            setItems(result);
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
    let lastType = 0;
    let cardClass = "";
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
          <Grid item xs={9}>
            <Paper className={classes.placesGroup}>
              {items.map((place) => {
                const config = { ...place };
                cardClass = "";
                let title = "";
                if (lastType !== config.type && local) {
                  cardClass = lastType !== 0 ? classes.spacing : "";
                  lastType = config.type;
                  title = TYPES[config.type - 1];
                }
                return (
                  <div key={config.id} className={clsx(cardClass)}>
                    {title ? (
                      <div className={classes.typeTitle}>
                        <Typography variant={"h4"}>{title}</Typography>
                      </div>
                    ) : (
                      <div className={classes.place}>ok</div>
                    )}
                  </div>
                );
              })}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <Redirect to={"/"} />;
  }
};

// return (
//   <div className="Menu">
//     <div className="local-highlights d-flex justify-content-center mb-4">
//       <div className="d-flex flex-column justify-content-center align-items-center">
//         <h1>{pageInfo[type].headline}</h1>
//         <h6>{pageInfo[type].subheadline}</h6>
//       </div>
//     </div>

//     <div className="view-cards">
//       <div className="d-flex justify-content-center flex-wrap">
//         {items.map((place) => {
//           const config = { ...place };
//           return (
//             <div key={place.id}>
//               <Card config={config} />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   </div>
// );
