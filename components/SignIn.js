import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import fetch, { FetchError } from 'node-fetch';
import AuthToken from '../src/authtoken';

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
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const classes = useStyles();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const emailInput = useRef(null)
	const passwordInput = useRef(null)

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email.length && password.length) {
			postLogin({ email: email, password: password });
			return;
		}
		handleError();
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') handleSubmit;
	}

	const handleError = () => {
		emailInput.current.setAttribute('error', '');
	}

	return (
		<React.Fragment>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<form className={classes.form} onSubmit={handleSubmit} noValidate>
				<TextField
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
					onChange={(e) => setEmail(e.target.value)}
					ref={emailInput}
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
					ref={passwordInput}
					onKeyPress={handleKeyPress}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Remember me"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
				>
					Sign In
				</Button>
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
	// const data = new URLSearchParams(input);
	const result = await fetch(`https://kh-blog-app.herokuapp.com/login`, {
		method: 'post',
		body: JSON.stringify(input),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	result.json()
		.then((res) => { 
			if (res.email === input.email && res.token) {
				AuthToken.storeToken(res.token);
				return 'success';
			} else {
				//Error handling
			}
		})
};
