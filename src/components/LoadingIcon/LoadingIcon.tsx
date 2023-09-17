import React from 'react';

const LoadingIcon = () => {
	return (
		<div className="animated-cards">
			<span className="animated-cards__card-container">
				<div className="animated-cards__card animated-cards__card--top"></div>
				<div className="animated-cards__card animated-cards__card--bottom"></div>
			</span>
			<span className="animated-cards__card-container">
				<div className="animated-cards__card animated-cards__card--top"></div>
				<div className="animated-cards__card animated-cards__card--bottom"></div>
			</span>
			<span className="animated-cards__card-container">
				<div className="animated-cards__card animated-cards__card--top"></div>
				<div className="animated-cards__card animated-cards__card--bottom"></div>
			</span>
		</div>
	);
};

export default LoadingIcon;
