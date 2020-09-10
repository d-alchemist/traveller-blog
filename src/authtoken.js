import jwtDecode from 'jwt-decode';
import Cookie from "js-cookie";
import Router from "next/router";

export default class AuthToken {

	decodeToken;

	constructor(token) {
		// we are going to default to an expired decodedToken
		this.decodedToken = { email: '', exp: 0 };

		// then try and decode the jwt using jwt-decode
		try {
			if (token) this.decodedToken = jwtDecode(token);
		} catch (e) {}
	}

	get authorizationString() {
		return `Bearer ${this.token}`;
	}

	get expiresAt() {
		return new Date(this.decodedToken.exp * 1000);
	}

	get isExpired() {
		return new Date() > this.expiresAt;
	}

	get isValid() {
		return !this.isExpired;
    }
    
    static async storeToken(token) {
        Cookie.set('travel_storage__cookie', token);
        await Router.push("/admin");
    }
}
