import React, { useEffect, useState } from "react";
import logo from "../assets/img/ecofinder_logo.png";
import AuthService from "../services/auth.service";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Menu, MenuItem } from "@material-ui/core";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    justifyContent: "space-between",
    background: "#f9f9f9",
  },
  link: {
    color: "#222",
  },
}));

export default (props) => {
  const classes = useStyles();
  const menuId = "primary-search-account-menu";

  const [user, setUser] = useState();
  const [hasUser, setHasUser] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    let currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser({
        username: currentUser.username,
      });
      setHasUser(true);
    }
    return () => {};
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    AuthService.logout();
    window.location.reload();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!hasUser ? (
        <MenuItem className={classes.link}>
          <Link to={"/login"}>Login</Link>
        </MenuItem>
      ) : (
        <div>
          <Link to={"/login"}>
            <MenuItem className={classes.link}>Editar conta</MenuItem>
          </Link>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <div className={clsx(classes.root)}>
      <Toolbar variant="dense" className={clsx(classes.toolbar, "Header")}>
        <Link to={"/"}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            // onClick={home}
          >
            <img
              src={logo}
              alt="grundschrift-font"
              border="0"
              className="Logo"
            />
            {/* <MenuIcon /> */}
          </IconButton>
        </Link>

        <div className={"username"}>
          {hasUser ? `Olá, ${user.username}` : ""}
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle fontSize="large" />
          </IconButton>
        </div>
      </Toolbar>
      {renderMenu}
    </div>
  );
};
