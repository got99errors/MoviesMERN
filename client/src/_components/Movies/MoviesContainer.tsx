import { useEffect, useState } from "react";
import MoviesComp from "./Movies";
import AddMovieComp from "./AddMovie";
import { Tab, Tabs, AppBar, Box, Toolbar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { movieActions } from "../../_actions/movies.actions";
import { menuActions } from '../../_actions/menu.actions'
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { User, canCreateMovie} from '../../_domains/user'

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
	},
	toolbar: {
		// padding: theme.spacing(0),
		// margin: theme.spacing(0),
		// backgroundColor: "black",
	},
	tabs: {
		
	}
  }),
);

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <div>{children}</div>}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const MovieContainerComp = (props: any) => {
	const [value, setValue] = useState(0);
	const [searchValue, setSearchValue] = useState("");
	const dispatch = useDispatch();
	const editedMovie = useSelector(
		(state: any) => state.moviesReducer.editedMovie
	);
	const movies = useSelector((state: any) => state.moviesReducer.movies);
	const user: User = useSelector((state: any) => state.authReducer.user)
	const classes = useStyles();

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const addedSuccessfully = () => {
		dispatch(movieActions.stopEditMovie());
		setValue(0);
	};

	useEffect(() => {
		dispatch(menuActions.selectedMovies())
	}, [dispatch]);

	useEffect(() => {
		addedSuccessfully();
	}, [props]);

	return (
		<div>
			{/* <h2>Movies</h2> */}
			{(editedMovie === null || editedMovie === undefined) && (
				<Box>
					<AppBar position="static">
					<Toolbar className={classes.toolbar}>
						<Tabs
							className={classes.tabs}
							value={value}
							onChange={handleChange}
							aria-label=""
							centered
							indicatorColor="secondary"
						>
							<Tab label="All Movies" {...a11yProps(0)} />
							{canCreateMovie(user) && <Tab label="Add Movie" {...a11yProps(1)} />}
						</Tabs>
						</Toolbar>

						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								value={searchValue}
								onChange={(event:React.ChangeEvent<HTMLInputElement>)=>setSearchValue(event.target.value)}
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ "aria-label": "search" }}

							/>
						</div>
					</AppBar>

					
					<TabPanel value={value} index={0}>
						<MoviesComp movies={movies} search={searchValue} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<AddMovieComp
							movies={movies}
							addedSuccessfully={addedSuccessfully}
						/>
					</TabPanel>
				</Box>
			)}
			{editedMovie !== null && editedMovie !== undefined && (
				<AddMovieComp
					movies={movies}
					editedMovie={{ ...editedMovie }}
					addedSuccessfully={addedSuccessfully}
				/>
			)}
		</div>
	);
};
export default MovieContainerComp;
