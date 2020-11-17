import React, { useState, useEffect, useRef } from "react";
import {
	Box,
	Button,
	Grid,
	IconButton,
	Input,
	InputBase,
	List,
	ListItem,
	ListItemText,
	makeStyles,
	Menu,
	MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import { ArrowDropDownOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import API from "../API";

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(2),
	},
	search: {
		display: "flex",
		width: "100%",
		// alignItems: "center",
		borderRadius: "50px",
		position: "relative",
	},
	searchTerm: {
		width: "110%",
		borderRight: "none",
		padding: "5px",
		height: "60px",
		fontSize: "20px",
		borderRadius: "20px",
		outline: "none !important",
		background: "#f9f9f9",
		boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.5)",
		border: "none",
		"&:focus": {
			color: "#222",
			padding: "15px",
		},
	},
	searchButton: {
		width: "60px",
		height: "60px",
		textAlign: "center",
		borderRadius: "20px",
		cursor: "pointer",
		boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.5)",
		marginLeft: "16px",
		background: "linear-gradient(116.8deg, #37C77F -41.65%, #00FF3A 99.75%);",
		color: "#f9f9f9",
		"&:hover": {
			color: "#222",
			background: "#79FD86",
		},
	},
	list: {
		width: "87%",
		backgroundColor: theme.palette.background.paper,
		color: "#222",
		borderRadius: "20px",
		marginTop: "10px",
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
	const [dense, setDense] = React.useState(false);

	const [display, setDisplay] = useState(false);
	const [options, setOptions] = useState([]);
	const [search, setSearch] = useState("");
	const isMenuOpen = Boolean(anchorEl);
	const inputRef = useRef("");

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

	function generate(element) {
		return [0, 1, 2].map((value) =>
			React.cloneElement(element, {
				key: value,
			})
		);
	}

	function handleSearch(e) {
		const { value } = e.target;
		fetch(`${API}/city/${value}`).then((res) => {
			console.log(res);
		});
	}

	return (
		<Box className={classes.wrap}>
			<div className={classes.search}>
				<input
					type="text"
					className={classes.searchTerm}
					placeholder="O que você busca?"
					onKeyUp={handleSearch}
				/>
				<Button color="inherit" size="large" className={classes.searchButton}>
					<SearchIcon />
				</Button>
			</div>
			<div className={classes.list}>
				<List dense={dense}>
					{generate(
						<ListItem>
							<ListItemText primary="Single-line item" />
						</ListItem>
					)}
				</List>
			</div>
		</Box>
	);
};

// return (
//   <Grid container className={clsx("Search")}>
//     {/* <Grid item xs={3}>
//       <IconButton
//         edge="end"
//         className={clsx(classes.category, "btn-category")}
//         aria-controls={"select-type"}
//         aria-haspopup="true"
//         onClick={handleProfileMenuOpen}
//         color="inherit"
//       >
//         {categories[type]}
//         <ArrowDropDownOutlined fontSize="large" />
//       </IconButton>
//     </Grid> */}
//     <Grid item xs={9} className={clsx(classes.search)}>
//       <InputBase
//         className={clsx("search")}
//         id="input-with-icon-adornment"
//         // onKeyUp={keyUpHandler}
//         onClick={() => setVisible(false)}
//         ref={inputRef}
//       />
//       <IconButton
//         className={clsx("btn-search", classes.btnSearch)}
//         position="end"
//         to={target}
//         onClick={(event) => {
//           event.preventDefault();
//           event.stopPropagation();
//           // if (target !== "/place") history.push(`${target}`);
//           if (target !== "/place")
//             history.push("/places", { type: type, place: place });
//           else {
//             setVisible(true);
//             inputRef.current.focus();
//           }
//         }}
//       >
//         <SearchIcon />
//         {visible ? "Search" : ""}
//       </IconButton>
//     </Grid>
//     {renderMenu}
//   </Grid>
// );
