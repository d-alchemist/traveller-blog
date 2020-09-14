import React, { useEffect } from 'react';
import Cookie from 'js-cookie';
import Router from 'next/router';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	skelroot: {
		marginTop: '5rem',
		width: '100%',
		padding: '4rem'
	},
	skel: {
		margin: '1rem 0'
	}
});

const login = '/login?redirected=true';

export default (WrappedComponent) => {
	const checkAuthentication = () => {
		return Cookie.get('travel_storage__cookie') ? true : false;
	};

	const hocComponent = ({ ...props }) => {
		const classes = useStyles();

        useEffect(() => {
            if (!checkAuthentication()) {
				Router.replace(login);
			}
        }, [])
		
		return checkAuthentication() ? <WrappedComponent {...props} /> : (
            <div className={classes.skelroot}>
                {[1,2,3,4,5,6,7,8].map((i) => (
					<React.Fragment key={i} >
						<Skeleton animation="pulse" height={40} className={classes.skel} />
					</React.Fragment>
				))}
            </div>
        );
	};

	return hocComponent;
};
