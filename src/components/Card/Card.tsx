// import React[useState]from 'react';
import { useState } from 'react';

const Card = () => {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleFlipClick = () => {
		setIsFlipped((prevIsFlipped) => !prevIsFlipped);
	};

	return (
		<div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
			<div className="card__content">
				{/* FRONTSIDE */}
				<div className="card__side card__side--front">
					<div className="card__top">
						Top<h1 className="card__heading">Q</h1>
					</div>
					<div className="card__center">
						<p className="card__text">
							What framework is C# closely associated with?
						</p>
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
				<div className="card__side card__side--back">
					<div className="card__top">
						Top<h1 className="card__heading">A</h1>
					</div>
					<div className="card__center">
						<p className="card__text">
							C# is closely associated with the .NET framework.
						</p>
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
