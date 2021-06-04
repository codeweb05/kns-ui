
import {
	useLocation, useHistory
} from "react-router-dom";
import { useEffect, useCallback } from "react";
import Loader from './Loader/Loader';
import { createFirstBooking } from "../services/CustomerService";

export const GoogleCallbackComponent = () => {
	let location = useLocation();
	let history = useHistory();

	const booking = useCallback(() => {
		createNewBooking(location.search);
	}, [location]);

	useEffect(() => {
		booking();
	}, [booking]);

	async function createNewBooking(search) {
		try {
			const res = await createFirstBooking(search);
			console.log(res);
			let user = localStorage.getItem('red_leaf_user');
			user = JSON.parse(user);
			user.isGoogleLogin = true;
			localStorage.setItem("red_leaf_user", JSON.stringify(user));
			history.push("/home");
		} catch (error) {
			console.log(error);
		}
	}

	return (<Loader showLoader={true} />)
}