import React, { useEffect, useState } from "react";
import logo from "../assets/img/ecofinder_logo.png";
import AuthService from "../services/auth.service";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { AppBar, Button, Menu, MenuItem, Typography } from "@material-ui/core";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appbar: {
		background: "#f9f9f9ff",
		color: "green",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));
export default (props) => {
	const classes = useStyles();
	const menuId = "primary-search-account-menu";

	const [user, setUser] = useState();
	const [hasUser, setHasUser] = useState(false);
	const { goBack, push } = useHistory();

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

	const logout = () => {
		AuthService.logout();
		window.location.reload();
	};

	const login = (e) => {
		push("/login");
	};

	return (
		<AppBar position="sticky" className={classes.appbar}>
			<Toolbar>
				<IconButton
					edge="start"
					className={classes.menuButton}
					color="inherit"
					aria-label="menu"
				>
					<MenuIcon />
				</IconButton>
				<Typography
					variant="h6"
					className={classes.title}
					onClick={() => push("/")}
				>
					Ecofinder
				</Typography>
				{!hasUser ? (
					<Button color="inherit" onClick={(e) => login(e)}>
						Login
					</Button>
				) : (
					<div>Olá, {user.username}</div>
				)}
			</Toolbar>
		</AppBar>
	);
};

// return (
//   <div className={clsx(classes.root)}>
//     <Toolbar variant="dense" className={clsx(classes.toolbar, "Header")}>
//       <Link to={"/"}>
//         <IconButton
//           edge="start"
//           className={classes.menuButton}
//           color="inherit"
//           aria-label="menu"
//           // onClick={home}
//         >
//           <img
//             src={logo}
//             alt="grundschrift-font"
//             border="0"
//             className="Logo"
//           />
//           {/* <MenuIcon /> */}
//         </IconButton>
//       </Link>

//       <div className={"username"}>
//         {hasUser ? `Olá, ${user.username}` : ""}
//         <IconButton
//           edge="end"
//           aria-label="account of current user"
//           aria-controls={menuId}
//           aria-haspopup="true"
//           onClick={handleProfileMenuOpen}
//           color="inherit"
//         >
//           <AccountCircle fontSize="large" />
//         </IconButton>
//       </div>
//     </Toolbar>
//     {renderMenu}
//   </div>
// );
