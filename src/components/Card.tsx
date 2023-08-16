import React from 'react';

const Card = () => {
	return (
		<div className="card">
			<div className="card__content">
				<div className="card__side card__side--front">Question</div>
				<div className="card__side card__side--back">Answer</div>
			</div>
		</div>
	);
};

export default Card;
