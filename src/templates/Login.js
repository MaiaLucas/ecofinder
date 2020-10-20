import { Box } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import lotus from "../assets/img/lotus_small.png";
import FormLogin from "../components/FormLogin";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  bg: {},
  media: {
    height: "100%",
  },
}));
export default (props) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      m={1}
      p={1}
      className={classes.bg}
      height={"calc(100vh - 8.85rem);"}
    >
      <Card className={classes.root}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            m={1}
            p={1}
          >
            <img src={lotus} alt={"login"} />
            <b>Login</b>
            <FormLogin />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
