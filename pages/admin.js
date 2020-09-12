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
import axios from 'axios';

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

function AdminDrawer({ posts }) {
	const classes = useStyles();

	const router = useRouter();

	const handleClick = (e) => {
		e.preventDefault();
		router.push('/newpost');
	};
	
	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header isDashboard={true} />
			<main className={classes.content}>
				<Toolbar />
				<div className={classes.heading}>
					<Typography variant="h4" gutterBottom>
						Welcome,
					</Typography>
				</div>
				<EnhancedTable posts={posts['articles']['data']} />
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
	container: PropTypes.any,
	posts: PropTypes.object
};

export async function getStaticProps() {
	const res = await axios('https://kh-blog-app.herokuapp.com/api/v1/articles/');
	const posts = res.data;
	
	return {
		props: {
			posts,
		},
	};
}

export default AdminDrawer;