import React from 'react';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Copyright from '../components/Copyright';
import CardComponent from '../components/Card';
import Header from '../components/Header';
import fetch from 'node-fetch';

const useStyles = makeStyles(() => ({
	hero: {
		backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/beach-image.jpg')`,
		backgroundPosition: 'center',
		height: '500px',
		position: 'relative',
		display: 'flex',
		backgroundSize: 'cover',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundRepeat: 'no-repeat',
		color: '#fff',
	},
	blogContainer: {
		marginTop: '3rem',
	},
	blogTitle: {
		marginBottom: '3rem',
	},
}));

Index.propTypes = {
	posts: propTypes.object,
}

export default function Index({ posts }) {
	const classes = useStyles();
	
	return (
		<React.Fragment>
			<Header isHomepage={true} />
			<Toolbar />
			<Box component="div" className={classes.hero}>
				<Typography variant="h1" component="h1">
					Travel Blog
				</Typography>
			</Box>
			<Container className={classes.blogContainer}>
				<Typography variant="h4" component="h1" className={classes.blogTitle}>
					Featured Posts
					<Divider />
				</Typography>
				<Grid container spacing={4}>
					{posts['articles']['data'].map((post, key) => (
						<Grid item sm={6} xs={12} key={key}>
							<CardComponent allPosts={post} />
						</Grid>
					))}
				</Grid>
				<Toolbar />
				<Divider />
				<Copyright />
			</Container>
		</React.Fragment>
	);
}

export async function getStaticProps() {
	const res = await fetch('https://kh-blog-app.herokuapp.com/api/v1/articles');
	const posts = await res.json();

	return {
		props: {
			posts,
		},
	};
}