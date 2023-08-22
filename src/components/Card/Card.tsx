import React, { useState } from 'react';
import CardProps from '../../types/CardTypes';

const Card: React.FC<CardProps> = ({
	question,
	correctAnswer,
	// WrongAnswer1,
	// WrongAnswer2,
	// WrongAnswer3,
	// CollectionId,
	colorClass,
}) => {
	const [isFlipped, setIsFlipped] = useState(false);

	// const handleFlipClick = () => {
	// 	setIsFlipped((prevIsFlipped) => !prevIsFlipped);
	// };
	const handleFlipClick = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
			<div className="card__content">
				{/* FRONTSIDE */}
				<div className={`card__side card__side--front ${colorClass}`}>
					<div className="card__top">
						Top<h1 className="card__heading">Q</h1>
					</div>
					<div className="card__center">
						<p className="card__text">{question}</p>
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
				<div className={`card__side card__side--back ${colorClass}`}>
					<div className="card__top">
						Top<h1 className="card__heading">A</h1>
					</div>
					<div className="card__center">
						<p className="card__text">{correctAnswer}</p>
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
