import React from 'react';

const style = {
    body: {
        background: '#000',
        height: '100vh',
        width: '100vw'
    },
    bodyText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center'
    }
}

function Error({ statusCode }) {
	return (
        <div style={style.body}>
            <h1>{statusCode}</h1>
            <h1 style={style.bodyText}>
                WE ARE EXPERIENCING SOME TECHNICAL DIFFICULTIES 
                <br/>
                WILL BE WITH YOU SHORTLY
            </h1>
        </div>
	);
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
