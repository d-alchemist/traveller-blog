import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SignIn from '../components/SignIn';
import Register from '../components/Register';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(12),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	panel: {
		transition: theme.transitions.duration.standard,
	},
}));

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}

function TabPanel(props) {
	// eslint-disable-next-line react/prop-types
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
				<Box p={3} component="div">
					{children}
				</Box>
			)}
		</div>
	);
}

export default function CenteredTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					centered
				>
					<Tab label="Sign In" {...a11yProps(0)} />
					<Tab label="Register" {...a11yProps(1)} />
				</Tabs>
				<TabPanel value={value} index={0} className={classes.panel}>
					<SignIn />
				</TabPanel>
				<TabPanel value={value} index={1} className={classes.panel}>
					<Register />
				</TabPanel>
			</Paper>
		</Container>
	);
}
