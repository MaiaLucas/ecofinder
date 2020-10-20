import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import { ArrowDropDownOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  search: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    // background: "#222",
    // justifyContent: "center",
    borderRadius: "50px",
  },
  btnSearch: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: "50px",
    padding: "15px",
  },
  category: {
    justifyContent: "space-between",
  },
}));

export default (props) => {
  const history = useHistory();
  const classes = useStyles();
  const categories = ["Categorias", "E-Coleta", "Experiências", "Lojas"];

  const [type, setType] = useState(0);
  const [place, setPlace] = useState("");
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState("/place");
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const inputRef = useRef("");

  useEffect(() => {
    return () => {};
  }, []);

  const changePlace = (e) => {
    const { value } = e.target;
    setType(value);
    if (value > 0) {
      setTarget(`/place/${value}/list/${place}`);
    } else {
      setTarget(`/place/list/${place}`);
    }
  };

  const keyUpHandler = (e) => {
    const { value } = e.target;

    if (type !== 0) setTarget(`/place/${type}/list/${value}`);
    else if (value.trim().length === 0) setTarget(`/place`);
    else setTarget(`/place/list/${value}`);

    setPlace(value);
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
      onChange={changePlace}
    >
      <MenuItem value={0} onClick={changePlace}>
        Categorias
      </MenuItem>
      <MenuItem value={1} onClick={changePlace}>
        E-Coleta
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
    <Grid container className={clsx("Search")}>
      <Grid item xs={3}>
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
      <Grid item xs={9} className={clsx(classes.search)}>
        <InputBase
          className={clsx("search")}
          id="input-with-icon-adornment"
          onKeyUp={keyUpHandler}
          onClick={() => setVisible(false)}
          ref={inputRef}
        />
        <IconButton
          className={clsx("btn-search", classes.btnSearch)}
          position="end"
          to={target}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            // if (target !== "/place") history.push(`${target}`);
            if (target !== "/place")
              history.push("/places", { type: type, place: place });
            else {
              setVisible(true);
              inputRef.current.focus();
            }
          }}
        >
          <SearchIcon />
          {visible ? "Search" : ""}
        </IconButton>
      </Grid>
      {renderMenu}
    </Grid>
  );
};
