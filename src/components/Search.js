import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import { ArrowDropDownOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  search: {
    // background: "#222",
    width: "100%",
    fontSize: "30px",
    padding: theme.spacing(2),
  },
  category: {
    // width: "25%",
    // margin: "auto 15px",
    // border: "none",
    justifyContent: "space-between",
  },
}));

export default (props) => {
  const classes = useStyles();
  const categories = [
    "Categorias",
    "Postos de Coleta",
    "Experiências",
    "Lojas",
  ];

  const [type, setType] = useState(0);
  const [place, setPlace] = useState("");
  const [disabledLink, setDisabledLink] = useState("disabled-link");
  const [target, setTarget] = useState("/place");
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    return () => {};
  }, []);

  const changePlace = (e) => {
    const { value } = e.target;
    console.log(categories[value]);
    console.log(value);
    setType(value);
    // setTitle(categories[value]);
    // setTarget(`/place/${id}/list/${place}`);
  };

  const keyUpHandler = (e) => {
    setPlace(e.target.value);
    if (e.target.value.length) setDisabledLink("");
    else setDisabledLink("disabled-link");

    if (type !== 0) setTarget(`/place/${type}/list/${place}`);
    else setTarget(`/place/list/${place}`);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      id="select-type"
      value={type}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      // className={clsx("btn-category")}
      onChange={changePlace}
    >
      <MenuItem value={1} onClick={changePlace}>
        Postos de Coleta
      </MenuItem>
      <MenuItem value={2} onClick={changePlace}>
        Experiências
      </MenuItem>
      <MenuItem value={3} onClick={changePlace}>
        Lojas
      </MenuItem>
    </Menu>
  );

  return (
    // <form className="Search input-group d-flex justify-content-end align-items-center"></form>
    <Grid container className={clsx("Search")}>
      <Grid item xs={4}>
        <IconButton
          edge="end"
          className={clsx(classes.category, "btn-category")}
          aria-controls={"select-type"}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          {categories[type]}
          <ArrowDropDownOutlined fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item xs={8}>
        <InputBase
          className={clsx("search", classes.search)}
          id="input-with-icon-adornment"
          onKeyUp={keyUpHandler}
          endAdornment={
            <IconButton
              className={"btn-search"}
              position="end"
              onClick={() => {
                console.log("foi");
              }}
            >
              <SearchIcon />
            </IconButton>
          }
        />
      </Grid>
      {renderMenu}
    </Grid>
  );
};
