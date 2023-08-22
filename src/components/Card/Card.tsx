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
						<p className="card__heading">QUESTION</p>
					</div>
					<div className="card__center">
						<p className="card__text">{question}</p>
					</div>
					<div className="card__bottom">
						{/* <p>QUESTION</p> */}
						<button className="card__btn-flip" onClick={handleFlipClick}>
							<span>See Answer</span>
						</button>
					</div>
				</div>
				{/* BACKSIDE */}
				<div className={`card__side card__side--back ${colorClass}`}>
					<div className="card__top">
						<p className="card__heading">ANSWER</p>
					</div>
					<div className="card__center">
						<p className="card__text">{correctAnswer}</p>
					</div>
					<div className="card__bottom">
						{/* <p>ANSWER</p> */}

						<button className="card__btn-flip" onClick={handleFlipClick}>
							<span>See Question</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
