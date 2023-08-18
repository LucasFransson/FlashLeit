import React from 'react';

const Card = () => {
	return (
		<div className="card">
			<div className="card__content">
				<div className="card__side card__side--front">
					<h1 className="card__heading">Question</h1>
					<p className="card__text">
						This is a question bla bla bla bla bla bla bla
					</p>
				</div>
				<div className="card__side card__side--back">
					<h1 className="card__heading">Answer</h1>
					<p className="card__text">
						This is an answer bla bla bla bla bla bla bla
					</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
