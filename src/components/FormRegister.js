import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import ChildCareOutlined from "@material-ui/icons/ChildCareOutlined";
import { Button, Snackbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "35ch",
  },
  button: {
    background: "#40916c",
    color: "#f9f9f9",
  },
}));

export default (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    showPassword: false,
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  let history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    const auth = await AuthService.register({
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
    if (typeof auth === "string") {
      setMessage(auth);
      setOpen(true);
      return;
    }

    console.log(auth);
    // history.push("/");

    // window.location.reload();
    return;
  };

  return (
    <div className={classes.root}>
      <form className={classes.root} onSubmit={(e) => onSubmit(e)}>
        <FormControl
          fullWidth
          className={clsx(classes.margin, classes.textField)}
        >
          <InputLabel htmlFor="email">Username *</InputLabel>
          <Input
            id="username"
            type="username"
            required
            value={values.username}
            onChange={handleChange("username")}
            endAdornment={
              <InputAdornment position="end">
                <ChildCareOutlined></ChildCareOutlined>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl
          fullWidth
          className={clsx(classes.margin, classes.textField)}
        >
          <InputLabel htmlFor="email">E-mail *</InputLabel>
          <Input
            id="email"
            type="email"
            required
            value={values.email}
            onChange={handleChange("email")}
            endAdornment={
              <InputAdornment position="end">
                <AccountCircleOutlined></AccountCircleOutlined>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">
            Password *
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            required
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="confirmPassword">Confirm Password *</InputLabel>
          <Input
            id="confirmPassword"
            type={values.showPassword ? "text" : "password"}
            value={values.confirmPassword}
            required
            onChange={handleChange("confirmPassword")}
          />
        </FormControl>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          className={clsx(classes.margin, classes.button, "btn-save")}
        >
          Continuar
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
