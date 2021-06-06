import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { logout } from "../services/UserService";

export default function Logout() {
	return (
		<div className="dropdown">
			<div className="btn-bars ms-5 dropbtn">
				<FontAwesomeIcon  icon={faBars} />
			</div>
			<ul className="list-group dropdown-content">
				<li className="list-group-item btn" onClick={logout}>Logout</li>
			</ul>
		</div>
	)
}
