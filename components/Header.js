import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '../components/Link';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Typography from '@material-ui/core/Typography';
import Cookie from 'js-cookie';

function ElevationScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

Header.propTypes = {
	isHomepage: PropTypes.bool,
	isDashboard: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
	menuButton: {
		textAlign: 'center',
	},
	appHead: {
		backgroundColor: theme.palette.header.main,
	},
	appMenu: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	headlogo: {
		textDecoration: 'none',
		color: '#fff',
		'&:hover': {
			textDecoration: 'none',
		},
	},
}));

const clearCookie = () => {
	Cookie.remove('travel_storage__cookie');
}

const LoginButton = () => (
	<Button color="inherit">
		<Link href="/login" color="primary">
			Login
		</Link>
	</Button>
)

const LogOutButton = () => (
	<Button color="inherit">
		<Link href="/" onClick={clearCookie} color="primary">
			Logout
		</Link>
	</Button>
)

export default function Header(props) {
	const classes = useStyles();

	return (
		<ElevationScroll {...props}>
			<AppBar className={classes.appHead}>
				<Toolbar className={classes.appMenu}>
					<Typography variant="h6" className={classes.menuButton}>
						<Link href="/" className={classes.headlogo}>
							The Traveller
						</Link>
					</Typography>
					{props.isHomepage ? (
						<LoginButton />
					) : (
						props.isDashboard ? (
							<LogOutButton />
						) : ''
					)}
				</Toolbar>
			</AppBar>
		</ElevationScroll>
	);
}
