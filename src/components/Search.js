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
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(2),
	},
	search: {
		display: "flex",
		width: "100%",
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
	searchOption: {
		width: "100%",
	},
	list: {
		width: "87%",
		backgroundColor: theme.palette.background.paper,
		color: "#222",
		borderRadius: "20px",
		marginTop: "10px",
		maxHeight: "400px",
	},
}));

export default (props) => {
	const { push } = useHistory();
	const classes = useStyles();
	const categories = ["Categorias", "E-Coleta", "Experiências", "Lojas"];

	const [type, setType] = useState(0);
	const [place, setPlace] = useState("");
	const [visible, setVisible] = useState(false);
	const [target, setTarget] = useState("/place");
	const [anchorEl, setAnchorEl] = useState(null);
	const [dense, setDense] = React.useState(false);

	const [options, setOptions] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const isMenuOpen = Boolean(anchorEl);
	const inputRef = useRef("");

	const searchPlace = (value = "") => {
		push("/places", {
			type: 0,
			place: typeof value === "string" ? value.toLowerCase() : searchValue,
		});
	};

	function generate() {
		return options.map((value) => (
			<ListItem>
				<Button
					color="inherit"
					size="large"
					className={classes.searchOption}
					onClick={(e) => searchPlace(value)}
				>
					<ListItemText primary={value} />
				</Button>
			</ListItem>
		));
	}

	function handleSearch(e) {
		const { value } = e.target;
		if (value.length) {
			setSearchValue(value);
			Axios.get(`${API}/city/${value}`)
				.then((req) => {
					setOptions(req.data);
					setVisible(true);
				})
				.catch((err) => {
					setVisible(false);
					setOptions([]);
				});
		}
	}

	return (
		<Box className={classes.wrap}>
			<div className={classes.search}>
				<input
					type="text"
					className={classes.searchTerm}
					placeholder="Digite a cidade que deseja buscar..."
					onKeyUp={handleSearch}
				/>
				<Button
					color="inherit"
					size="large"
					className={classes.searchButton}
					onClick={searchPlace}
				>
					<SearchIcon />
				</Button>
			</div>
			{visible && (
				<div className={classes.list}>
					<List dense={dense}>{generate()}</List>
				</div>
			)}
		</Box>
	);
};
