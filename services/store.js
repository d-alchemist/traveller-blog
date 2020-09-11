import React, { createContext, useReducer } from 'react';

const initialState = {
	isLoggedIn: false,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((state, action) => {
        let newState = null;
		switch (action.type) {
			case 'logIn':
				newState = { isLoggedIn: true };
				return newState;
			case 'logOut':
				newState = { isLoggedIn: false };
				return newState;
			default:
				throw new Error();
		}
	}, initialState);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
