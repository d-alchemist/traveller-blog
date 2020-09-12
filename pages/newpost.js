import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { green, red } from '@material-ui/core/colors';
import { Toolbar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

import Header from '../components/Header';
import instance from '../services/axios';

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

export default function newpost() {
	const classes = useStyles();
	const [postTitle, setPostTitle] = useState('');
	const [postBody, setPostBody] = useState('');

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = { title: postTitle, content: postBody };

		if (postTitle.length < 1 || postBody.length < 1) {
			setSuccess(false);
			return;
		}
		setLoading(true);
		
		await instance
			.post('/api/submit', body, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('myblogdata')}`,
				},
			})
			.then((res) => {
				if (
					res.status === 200 ||
					(res.status === 201 && res.data.title === body.title)
				) {
					setSuccess(true);
					setLoading(false);
					router.push('/admin');
				} else {
					setSuccess(false);
					setLoading(false);
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
						onChange={(e) => setPostTitle(e.target.value)}
						error={success === false}
					/>

					<TextField
						id="new-post"
						label="What would you like to share?"
						multiline
						rows={15}
						variant="outlined"
						className={classes.newBody}
						onChange={(e) => setPostBody(e.target.value)}
						error={success === false}
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
								Post
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
