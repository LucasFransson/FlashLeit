import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<div className="footer">
			<ul className="footer-list">
				<li className="footer-list__item"><Link to="/about">About</Link></li>
				<li className="footer-list__item">Item 2</li>
				<li className="footer-list__item">Item 3</li>
			</ul>
		</div>
	);
}

export default Footer;
