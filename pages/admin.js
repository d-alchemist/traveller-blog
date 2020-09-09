import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { useRouter } from 'next/router';

import Header from '../components/Header';
import EnhancedTable from '../components/BlogTable';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	absolute: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(3),
	},
}));

function AdminDrawer() {
	const classes = useStyles();

	const router = useRouter();

	const handleClick = (e) => {
		e.preventDefault();
		router.push('/newpost');
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header isHomepage={false} />
			<main className={classes.content}>
				<Toolbar />
				<div className={classes.heading}>
					<Typography variant="h4" gutterBottom>
						Welcome,
					</Typography>
				</div>
				<EnhancedTable />
				<Tooltip title="Create Post">
					<Fab
						color="secondary"
						className={classes.absolute}
						onClick={handleClick}
					>
						<EditIcon />
					</Fab>
				</Tooltip>
			</main>
		</div>
	);
}

AdminDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	container: PropTypes.any,
};

export default AdminDrawer;
