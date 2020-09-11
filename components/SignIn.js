import React, { useState } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'node-fetch';
import { green, red } from '@material-ui/core/colors';

import { AuthToken } from '../services/authtoken';
import { validateEmail } from '../services/validateEmail';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
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
}));

export default function SignIn() {
	const classes = useStyles();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [loading, setLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateEmail(email) === false) {
			setSuccess(false);
			return;
		}
		
		if (email.length && password.length) {
			setLoading(true);
			postLogin({ email, password }).then((res) => {
				if (res === true) {
					setSuccess(true);
					setLoading(false);
				}
				if (res === false) {
					setSuccess(false);
					setLoading(false);
				}
			});
			return;
		}
		setSuccess(false);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') handleSubmit;
	};

	const buttonClassname = clsx({
		[classes.buttonSuccess]: success,
		[classes.buttonFailure]: success === false,
	});

	return (
		<React.Fragment>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<form className={classes.form} onSubmit={handleSubmit}>
				<TextField
					error={success === false}
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					type="email"
					autoComplete="email"
					autoFocus
					onKeyPress={handleKeyPress}
					onChange={(e) => {
						setEmail(e.target.value);
						setSuccess(undefined);
					}}
				/>
				<TextField
					error={success === false}
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
					onKeyPress={handleKeyPress}
					onChange={(e) => {
						setPassword(e.target.value);
						setSuccess(undefined);
					}}
				/>
				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Remember me"
				/>
				{success === false ? (
					<Typography
						style={{ textAlign: "center", color: "#e73535" }}
						variant="subtitle2"
						display="block"
						gutterBottom
					>
						Enter valid login credentials
					</Typography>
				) : (
					''
				)}
				<div className={classes.wrapper}>
					<Button
						variant="contained"
						type="submit"
						fullWidth
						color="primary"
						className={buttonClassname}
						disabled={loading}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
					{loading && (
						<CircularProgress size={24} className={classes.buttonProgress} />
					)}
				</div>
				<Grid container>
					<Grid item xs>
						<Link href="#" variant="body2">
							Forgot password?
						</Link>
					</Grid>
				</Grid>
			</form>
		</React.Fragment>
	);
}

export const postLogin = async (input) => {
	const result = await fetch(`https://kh-blog-app.herokuapp.com/login`, {
		method: 'post',
		body: JSON.stringify(input),
		headers: {
			'Content-Type': 'application/json',
		},
		timeout: 20000,
	});
	return result.json().then((res) => {
		if (res.email === input.email && res.token) {
			localStorage.setItem('myblogdata', res.token);
			AuthToken.storeToken(res.token);
			return true;
		} else if (res.message === 'You are not registered!') {
			return false;
		}
	});
};
