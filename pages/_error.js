import React from 'react';
import Router from 'next/router';
import classes from './styles/error.module.css';

function Error({ statusCode }) {
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

Error.getInitialProps = ({ res, req, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

	if (statusCode === 404) {
		if (req.url.match(/\/$/)) {
			const withoutTrailingSlash = req.url.substr(0, req.url.length - 1);
			if (res) {
				res.writeHead(303, {
					Location: withoutTrailingSlash,
				});
				res.end();
			} else {
				Router.push(withoutTrailingSlash);
			}
		}
	}

	return { statusCode };
};

export default Error;
