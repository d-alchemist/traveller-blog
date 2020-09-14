import React from 'react';
import Router from 'next/router';

const style = {
	body: {
		background: '#000',
		height: '100vh',
		width: '100vw',
	},
	bodyText: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#fff',
		textAlign: 'center',
	},
};

function Error({ statusCode }) {
	return (
		<div style={style.body}>
			<h1>{statusCode}</h1>
			<h1 style={style.bodyText}>
				WE ARE EXPERIENCING SOME TECHNICAL DIFFICULTIES
				<br />
				WILL BE WITH YOU SHORTLY
			</h1>
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
