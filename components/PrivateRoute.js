import React from 'react';
import Router from 'next/router';
import { AuthToken } from '../services/authtoken';

export const PrivateRoute = (Component) => {
    let string = new AuthToken();
    console.log(string)
	if (AuthToken.isExpired) {
        Router.replace('/');
    }
    return(Component);
};
