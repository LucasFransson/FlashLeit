import React, { useEffect, useState } from 'react';

interface CardProps {
	question: string;
	correctAnswer: string;
	wrongAnswer1: string | null;
	wrongAnswer2: string | null;
	wrongAnswer3: string | null;
	collectionId: number;
}

const Card: React.FC<CardProps> = ({
	question,
	correctAnswer,
	wrongAnswer1,
	wrongAnswer2,
	wrongAnswer3,
	collectionId,
}) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [randomColorClass, setRandomColorClass] = useState('');

	useEffect(() => {
		const colorClasses = [
			'azure',
			'skyblue',
			'navy',
			'aquamarine',
			'malachite',
			'pink',
			'gray',
			'lime',
			'yellow',
			'purple',
			'lilac',
			'maroon',
		];
		const randomClass =
			colorClasses[Math.floor(Math.random() * colorClasses.length)];
		setRandomColorClass(randomClass);
	}, []);

	const handleFlipClick = () => {
		setIsFlipped((prevIsFlipped) => !prevIsFlipped);
	};

	return (
		<div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
			<div className="card__content">
				{/* FRONTSIDE */}
				<div className={`card__side card__side--front ${randomColorClass}`}>
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
				<div className={`card__side card__side--back ${randomColorClass}`}>
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

// // import React[useState]from 'react';
// import { useEffect, useState } from 'react';

// const Card = () => {
// 	const [isFlipped, setIsFlipped] = useState(false);
// 	const [randomColorClass, setRandomColorClass] = useState('');

// 	useEffect(() => {
// 		const colorClasses = [
// 			'azure',
// 			'skyblue',
// 			'navy',
// 			'aquamarine',
// 			'malachite',
// 			'pink',
// 			'gray',
// 			'lime',
// 			'yellow',
// 			'purple',
// 			'lilac',
// 			'maroon',
// 		];
// 		const randomClass =
// 			colorClasses[Math.floor(Math.random() * colorClasses.length)];
// 		setRandomColorClass(randomClass);
// 	}, []);

// 	const handleFlipClick = () => {
// 		setIsFlipped((prevIsFlipped) => !prevIsFlipped);
// 	};

// 	return (
// 		<div className={`card ${isFlipped ? 'is-flipped' : ''}`}>
// 			<div className="card__content">
// 				{/* FRONTSIDE */}
// 				<div className={`card__side card__side--front ${randomColorClass}`}>
// 					<div className="card__top">
// 						Top<h1 className="card__heading">Q</h1>
// 					</div>
// 					<div className="card__center">
// 						<p className="card__text">
// 							What framework is C# closely associated with?
// 						</p>
// 						<button className="flip-button" onClick={handleFlipClick}>
// 							See Answer
// 						</button>
// 					</div>
// 					<div className="card__bottom">
// 						<p>QUESTION</p>
// 						Bottom
// 					</div>
// 				</div>
// 				{/* BACKSIDE */}
// 				<div className={`card__side card__side--back ${randomColorClass}`}>
// 					<div className="card__top">
// 						Top<h1 className="card__heading">A</h1>
// 					</div>
// 					<div className="card__center">
// 						<p className="card__text">
// 							C# is closely associated with the .NET framework.
// 						</p>
// 						<button className="flip-button" onClick={handleFlipClick}>
// 							See Question
// 						</button>
// 					</div>
// 					<div className="card__bottom">
// 						<p>ANSWER</p>
// 						Bottom
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Card;
