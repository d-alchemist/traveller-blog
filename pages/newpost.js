import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Header from '../components/Header';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';

const useStyles = makeStyles(() => ({
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
}));

export default function newpost() {
	const classes = useStyles();
	const [postTitle, setPostTitle] = useState('');
	const [postBody, setPostBody] = useState('');

	const router = useRouter();

	const handleBackClick = (e) => {
		e.preventDefault();
		router.push('/admin');
	};

	const handleSubmit = () => {
		if (postTitle.length < 1 || postBody.length < 1) {
			// Create dialog box
			return;
		}

		// fetch('https://kh-blog-app.herokuapp.com/api/v1/articles', {
		// 	method: 'post',
		// 	body: JSON.stringify(body),
		// 	headers: { 'Content-Type': 'application/json' },
		// })
		// 	.then((res) => res.json())
		// 	.then((json) => console.log(json));
	};

	return (
		<React.Fragment>
			<Header />
			<Toolbar />
			<Toolbar />
			<Container maxWidth="md">
				<form noValidate onSubmit={handleSubmit} autoComplete="off">
					<TextField
						id="post-title"
						label="Title"
						variant="outlined"
						className={classes.newTitle}
						onChange={(e) => setPostTitle(e.target.value)}
					/>

					<TextField
						id="new-post"
						label="What would you like to share?"
						multiline
						rows={15}
						variant="outlined"
						className={classes.newBody}
						onChange={(e) => setPostBody(e.target.value)}
					/>
					<div className={classes.buttonContainer}>
						<Button color="primary" onClick={handleBackClick}>
							&larr; Back to Admin
						</Button>
						<Button variant="contained" color="primary" type="submit">
							Post
						</Button>
					</div>
				</form>
			</Container>
		</React.Fragment>
	);
}
