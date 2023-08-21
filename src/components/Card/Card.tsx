import React, { useState } from 'react';
import CardProps from '../../types/CardTypes';

const Card: React.FC<CardProps> = ({
	Question,
	CorrectAnswer,
	// WrongAnswer1,
	// WrongAnswer2,
	// WrongAnswer3,
	// CollectionId,
	ColorClass,
}) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleFlipClick = () => {
		setIsFlipped((prevIsFlipped) => !prevIsFlipped);
	};

	return (
		<div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
			<div className="card__content">
				{/* FRONTSIDE */}
				<div className={`card__side card__side--front ${ColorClass}`}>
					<div className="card__top">
						Top<h1 className="card__heading">Q</h1>
					</div>
					<div className="card__center">
						<p className="card__text">{Question}</p>
						<button className="flip-button" onClick={handleFlipClick}>
							See Answer
						</button>
					</div>
					<div className="card__bottom">
						<p>QUESTION</p>
						Bottom
					</div>
				</div>
				{/* BACKSIDE */}
				<div className={`card__side card__side--back ${ColorClass}`}>
					<div className="card__top">
						Top<h1 className="card__heading">A</h1>
					</div>
					<div className="card__center">
						<p className="card__text">{CorrectAnswer}</p>
						<button className="flip-button" onClick={handleFlipClick}>
							See Question
						</button>
					</div>
					<div className="card__bottom">
						<p>ANSWER</p>
						Bottom
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
