import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AuthToken } from '../services/authtoken';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import { green, red } from '@material-ui/core/colors';
import { validateEmail } from '../services/validateEmail';

import instance from '../services/axios';

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

export default function Register() {
	const classes = useStyles();

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [loading, setLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(null);

	const buttonClassname = clsx({
		[classes.buttonSuccess]: success,
		[classes.buttonFailure]: success === false,
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateEmail(email) === false) {
			setSuccess(false);
			return;
		}

		if (email.length && username.length && password.length) {
			setLoading(true);
			postRegister({ email, password, username }).then((res) => {
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

	return (
		<React.Fragment>
			<Typography component="h1" variant="h5">
				Register
			</Typography>
			<form className={classes.form} onSubmit={handleSubmit} noValidate>
				<TextField
					error={success === false}
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="username"
					label="Username"
					name="username"
					autoComplete="username"
					autoFocus
					onChange={(e) => {
						setUsername(e.target.value);
						setSuccess(null);
					}}
				/>
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
					onChange={(e) => {
						setEmail(e.target.value);
						setSuccess(null);
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
					autoComplete="new-password"
					onChange={(e) => {
						setPassword(e.target.value);
						setSuccess(null);
					}}
				/>
				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Remember me"
				/>
				{success === false ? (
					<Typography
						style={{ textAlign: 'center', color: '#e73535' }}
						variant="subtitle2"
						display="block"
						gutterBottom
					>
						Enter valid details
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
						Sign Up
					</Button>
					{loading && (
						<CircularProgress size={24} className={classes.buttonProgress} />
					)}
				</div>
			</form>
		</React.Fragment>
	);
}

export const postRegister = async (input) => {
	const result = await instance.post('/api/register', input);
	if (result.status === 200 && result.data.email === input.email && result.data.token) {
		sessionStorage.setItem('myblogdata', result.data.token);
		AuthToken.storeToken(result.data.token);
		return true;
	} else if (
		result.status === 400 ||
		result.message.error === 'User already registered'
	) {
		return false;
	}
};
