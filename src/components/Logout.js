import { Popup } from "reactjs-popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { logout } from "../services/UserService";

export default function Logout() {
	return (

		<Popup
			trigger={
				<div className="btn-bars ms-5">
					<FontAwesomeIcon className="mb-4" icon={faBars} />
				</div>
			}
			position="left"
		>
			{(close) => (
				<ul className="list-group">
					<li className="list-group-item btn"  onClick={logout}>Logout</li>
				</ul>
			)}
		</Popup>

	)
}
