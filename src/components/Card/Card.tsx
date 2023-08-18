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
				<div className="card__side card__side--front">
					<h1 className="card__heading">Q</h1>
					<div className="card__center">
						<p className="card__text">
							What framework is C# closely associated with?
						</p>
						<button className="flip-button" onClick={handleFlipClick}>
							Flip Card
						</button>
					</div>
				</div>
				<div className="card__side card__side--back">
					<h1 className="card__heading">A</h1>
					<p className="card__text">
						C# is closely associated with the .NET framework.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
