import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Header from '../components/Header';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter, useRouter } from 'next/router';
import fetch from 'node-fetch';
import PropTypes from 'prop-types';
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	newTitle: {
		display: 'flex',
		marginBottom: '3rem',
	},
	newBody: {
		display: 'flex',
	},
	buttonContainer: {
		display: 'flex',
		marginTop: '3rem',
		justifyContent: 'space-between',
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	},
	buttonSuccess: {
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700],
		},
	},
	buttonFailure: {
		backgroundColor: red[500],
		'&:hover': {
			backgroundColor: red[700],
		},
	},
	buttonProgress: {
		color: green[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
		margin: theme.spacing(3, 0, 2),
	},
}));

editpost.propType = {
	title: PropTypes.string,
	content: PropTypes.string,
};

function editpost({ posts }) {
	const classes = useStyles();
	const [postTitle, setPostTitle] = useState(posts.title);
	const [postBody, setPostBody] = useState(posts.content);

	const [success, setSuccess] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const router = useRouter();

	const buttonClassname = clsx({
		[classes.buttonSuccess]: success,
		[classes.buttonFailure]: success === false,
	});


	const handleBackClick = (e) => {
		e.preventDefault();
		router.push('/admin');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const body = { title: postTitle, content: postBody };

		if (postTitle.length < 1 || postBody.length < 1) {
			setSuccess(false);
			return;
		}
		setLoading(true);

		fetch(`https://kh-blog-app.herokuapp.com/api/v1/articles/${posts.id}`, {
			method: 'put',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('myblogdata')}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.title === postTitle) {
					setSuccess(true);
					setLoading(false);
					router.push('/admin');
				}
			});
	};

	return (
		<React.Fragment>
			<Header />
			<Toolbar />
			<Toolbar />
			<Container maxWidth="md">
				<form onSubmit={handleSubmit} autoComplete="off">
					<TextField
						id="post-title"
						label="Title"
						variant="outlined"
						className={classes.newTitle}
						value={postTitle}
						error={success === false}
						onChange={(e) => setPostTitle(e.target.value)}
					/>

					<TextField
						id="new-post"
						label="What would you like to share?"
						multiline
						rows={15}
						variant="outlined"
						value={postBody}
						className={classes.newBody}
						error={success === false}
						onChange={(e) => setPostBody(e.target.value)}
					/>
					<div className={classes.buttonContainer}>
						<Button color="primary" onClick={handleBackClick}>
							&larr; Back to Dashboard
						</Button>
						<div className={classes.wrapper}>
							<Button
								variant="contained"
								type="submit"
								fullWidth
								color="primary"
								className={buttonClassname}
								disabled={loading}
							>
								Save Changes
							</Button>
							{loading && (
								<CircularProgress
									size={24}
									className={classes.buttonProgress}
								/>
							)}
						</div>
					</div>
				</form>
			</Container>
		</React.Fragment>
	);
}

editpost.getInitialProps = async (context) => {
	const res = await fetch(
		`https://kh-blog-app.herokuapp.com/api/v1/articles/${context.query.id}`
	);
	const posts = await res.json();
	return { posts };
};

export default withRouter(editpost);
