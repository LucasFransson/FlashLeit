import React, { useState } from "react";
import CardTypes from "../../types/CardTypes";

interface CardProps extends CardTypes {
	animateOut?: boolean;
	animationType?: string;
}

const Card: React.FC<CardProps> = ({
	// @ts-ignore: TS6133
	id,
	// @ts-ignore: TS6133
	collectionId,
	question,
	answer,
	// @ts-ignore: TS6133
	leitnerIndex,
	// @ts-ignore: TS6133
	lastReviewed,
	colorClass,
	animateOut,
	animationType,
	animationOnRendering,
}) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleFlipClick = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<div
			className={`card ${isFlipped ? "is-flipped" : ""} ${animateOut ? "animate-out" : ""} ${animationType === "correct" ? "animate-correct" : ""} ${
				animationType === "wrong" ? "animate-wrong" : ""
			} ${animationOnRendering != null ? `animate-render-${animationOnRendering}` : ""}`}
		>
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
						<p className="card__text">{answer}</p>
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

// <div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
// <div
// 	className={`card ${isFlipped ? 'is-flipped' : ''} ${
// 		animateOut ? 'animate-out' : ''
// 	}`}
// >
// <div
// 	className={`card ${isFlipped ? 'is-flipped' : ''} ${
// 		animateOut ? 'animate-out' : ''
// 	} ${animationType === 'correct' ? 'animate-correct' : ''} ${
// 		animationType === 'wrong' ? 'animate-wrong' : ''
// 	} `}
// >

// <div
// 	className={`card ${isFlipped ? 'is-flipped' : ''} ${
// 		animateOut ? 'animate-out' : ''
// 	} ${animationType === 'correct' ? 'animate-correct' : ''} ${
// 		animationType === 'wrong' ? 'animate-wrong' : ''
// 	}
// 	${animationOnRendering != null
// 		? `animate-render-${animationOnRendering}`
// 		: ''}
// 	`>
