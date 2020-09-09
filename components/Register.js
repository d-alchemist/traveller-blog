import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

export default function Register() {
	const classes = useStyles();

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email.length && username.length && password.length) {
			console.log(email, username, length)
		}
		console.error('error')
	}

	return (
		<React.Fragment>
			<Typography component="h1" variant="h5">
				Register
			</Typography>
			<form className={classes.form} onSubmit={handleSubmit} noValidate>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="username"
					label="Username"
					name="username"
					autoComplete="username"
					autoFocus
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					onChange={(e) => setEmail(e.target.value)}
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
					Register
				</Button>
			</form>
		</React.Fragment>
	);
}
