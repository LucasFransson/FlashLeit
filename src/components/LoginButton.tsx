import React from 'react';
import { ReactComponent as LoginIcon } from '../../public/svg/SVG/login-icon.svg';

interface LoginButtonProps {
	onClick?: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
	return (
		<button className="button-login" onClick={onClick}>
			<div className="button-login__sign">
				<LoginIcon />
			</div>
			<div className="button-login__text">Login</div>
		</button>
	);
};

export default LoginButton;
