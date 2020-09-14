import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import propTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import instance from '../../services/axios';
import { Divider } from '@material-ui/core';
import { useRouter } from 'next/router';

import Copyright from '../../components/Copyright';
import Header from '../../components/Header';
import axios from 'axios';

const useStyles = makeStyles(() => ({
	postImage: {
		backgroundImage: `url('https://picsum.photos/400/400')`,
		backgroundPosition: 'center',
		height: '400px',
		backgroundSize: 'cover',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundRepeat: 'no-repeat',
		marginBottom: '2rem',
	},
	introBlock: {
		display: 'flex',
		alignItems: 'center',
	},
	introAvatar: {
		width: '6rem',
		height: '6rem',
	},
	avatarHeading: {
		fontSize: '1.2rem',
		color: '#454545',
		fontWeight: 400,
		marginBottom: '.5rem',
	},
	avatarSub: {
		fontSize: '.9rem',
		color: '#0000008a',
	},
	introName: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: '1.5rem',
	},
	articleTitle: {
		margin: '2rem 0',
		fontWeight: 600,
		fontSize: '3.3rem',
	},
	articleDetails: {
		color: '#0000008a',
		marginBottom: '2rem',
	},
	postSuggestions: {
		marginTop: '3rem',
	},
	articleBody: {
		fontSize: '1.2rem',
		fontWeight: 400,
	},
}));

Post.propTypes = {
	post: propTypes.object,
};

function Post({ post }) {
	const classes = useStyles();
	const { replace, isFallback } = useRouter();

	useEffect(() => {
		if (isFallback) {
			replace('/');
		}
	});

	return isFallback ? null : (
		<React.Fragment>
			<Header isHomepage={true} />
			<Toolbar />
			<Toolbar />
			<Container className={classes.blogContainer} maxWidth="md">
				<Box component="div" className={classes.introBlock}>
					<Avatar alt="Author's image" className={classes.introAvatar}>
						r
					</Avatar>
					<div className={classes.introName}>
						<Typography variant="h6" className={classes.avatarHeading}>
							Richie
						</Typography>
						<Typography
							variant="body1"
							gutterBottom
							className={classes.avatarSub}
						>
							Content Creator
						</Typography>
					</div>
				</Box>

				<Typography
					variant="h2"
					component="h1"
					gutterBottom
					className={classes.articleTitle}
				>
					{post.title}
				</Typography>

				<Typography
					variant="subtitle1"
					gutterBottom
					className={classes.articleDetails}
				>
					{post.created_at.split(' ')[0]} - 17 min read
				</Typography>

				<Box component="div" className={classes.postImage} />

				<Typography variant="body1" className={classes.articleBody} gutterBottom>
					{post.content}
				</Typography>

				<Typography
					variant="h6"
					component="h6"
					className={classes.postSuggestions}
				>
					{/* Suggested Posts */}
					<Divider />
				</Typography>
				<Copyright />
			</Container>
		</React.Fragment>
	);
}

export async function getStaticProps({ params }) {
    const res = await instance(`https://kh-blog-app.herokuapp.com/api/v1/articles/${params.id}`);
	const post = res.data;
	// Pass post data to the page via props
	return { props: { post } };
}

export async function getStaticPaths() {
	const res = await axios('https://kh-blog-app.herokuapp.com/api/v1/articles/');
    const posts = res.data;
	const getPath = posts.articles.data.map((post) => {
		return { id: `${post.id.toString()}` };
	});
    
    // fetch index of all the posts and index them

	return {
		paths: new Array(getPath.length)
			.fill(null)
			.map((_, index) => ({ params: getPath[index] })),
		fallback: true,
	};
}

export default Post;
