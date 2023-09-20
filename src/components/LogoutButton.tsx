import React from 'react';
import { ReactComponent as LogoutIcon } from '../../public/svg/SVG/logout-icon.svg';

interface LogoutButtonProps {
	onClick?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
	return (
		<button className="button-logout" onClick={onClick}>
			<div className="button-logout__sign">
				<LogoutIcon />
			</div>
			<div className="button-logout__text">Logout</div>
		</button>
	);
};

export default LogoutButton;
