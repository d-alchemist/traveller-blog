import React from 'react';
import classes from './styles/error.module.css';

function Custom404() {
	return (
		<div className={classes.idnotfound}>
			<div className={classes.notfound}>
				<div className={classes.notfoundfour}>
					<h1>404</h1>
				</div>
				<h2>Oops! This Page Could Not Be Found</h2>
				<p>
					Sorry but the page you are looking for does not exist, have been
					removed. name changed or is temporarily unavailable
				</p>
			</div>
		</div>
	);
}

export default Custom404;