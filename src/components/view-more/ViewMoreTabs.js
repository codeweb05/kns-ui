import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import YoutubeEmbed from "./YoutubeEmbed";
import Pdf from "./pdf";
import Maps from "./Maps";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					{children}
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function ViewMoreTabs() {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					aria-label="scrollable auto tabs example"
				>
					<Tab label="Video" className="sameText" {...a11yProps(0)} />
					<Tab label="Brochure" className="sameText" {...a11yProps(1)} />
					<Tab label="Location" className="sameText" {...a11yProps(2)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0} >
				<YoutubeEmbed embedId="Cu_U9k2C_PU?rel=0&showinfo=0&autoplay=1" />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Pdf />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Maps/>
			</TabPanel>
		</div>
	);
}
