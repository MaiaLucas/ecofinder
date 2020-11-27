import React, { useEffect, useRef, useState } from "react";
import AuthService from "../services/auth.service";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { AppBar, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import logo from "../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appbar: {
		background: "#f9f9f900",
		color: "#f9f9f9",
		boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.01)",
	},
	title: {
		flexGrow: 1,
		color: "#37C77F",
		"& img": {
			width: "120px",
			// fontSize: "20px",
		},
	},
	paper: {
		marginRight: theme.spacing(2),
	},
}));
export default (props) => {
	const classes = useStyles();

	const { push } = useHistory();
	const [user, setUser] = useState();
	const [hasUser, setHasUser] = useState(false);
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	useEffect(() => {
		(async () => {
			await AuthService.getCurrentUser().then((req, res) => {
				if (req.data) {
					const { username } = AuthService.userInfo();
					setUser(username);
				}
				setHasUser(req.data);
			});
		})();
		return () => {};
	}, []);

	const logout = () => {
		AuthService.logout();
		window.location.reload();
	};

	const login = (e) => {
		push("/login");
	};
	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<AppBar position="absolute" className={classes.appbar}>
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					<img src={logo} alt="logo" onClick={() => push("/")} />
				</Typography>
				{!hasUser ? (
					<Button color="inherit" onClick={(e) => login(e)}>
						Login
					</Button>
				) : (
					<>
						<IconButton
							edge="start"
							component="span"
							className="menu-button"
							color="inherit"
							aria-label="menu"
							ref={anchorRef}
							size="medium"
							aria-controls={open ? "menu-list-grow" : undefined}
							aria-haspopup="true"
							onClick={handleToggle}
						>
							<div className="username">Olá, {user}</div>
							<MenuIcon size="medium" />
						</IconButton>
						<Popper
							open={open}
							anchorEl={anchorRef.current}
							role={undefined}
							transition
							disablePortal
						>
							{({ TransitionProps, placement }) => (
								<Grow
									{...TransitionProps}
									style={{
										transformOrigin:
											placement === "bottom" ? "center top" : "center bottom",
									}}
								>
									<Paper>
										<ClickAwayListener onClickAway={handleClose}>
											<MenuList
												autoFocusItem={open}
												id="menu-list-grow"
												onKeyDown={handleListKeyDown}
											>
												<MenuItem onClick={logout}>Logout</MenuItem>
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
};
