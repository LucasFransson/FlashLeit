import React from 'react';
import CardTypes from '../types/CardTypes';
import HeartButton from './HeartButton';

interface smallCardProps {
	id: number;
	userId: number;
	publicKey: number;
	title: string;
	flashcards: CardTypes[];
	amountOfCorrectAnswers: number;
	amountOfIncorrectAnswers: number;
	amountOfCompletedRuns: number;
	isPublic?: boolean;
	description?: string;
	cardCount: number;
	colorClass: string | null;
	className: string | null;

	imageUrl?: string;
}

const imageFilenames = [
	'../../public/img/user_avatars/avatar_1.png',
	'../../public/img/user_avatars/avatar_2.png',
	'../../public/img/user_avatars/avatar_3.png',
	'../../public/img/user_avatars/avatar_4.png',
	'../../public/img/user_avatars/avatar_5.png',
	'../../public/img/user_avatars/avatar_6.png',
	'../../public/img/user_avatars/avatar_7.png',
	'../../public/img/user_avatars/avatar_8.png',
	'../../public/img/user_avatars/avatar_9.png',
	'../../public/img/user_avatars/avatar_10.png',
	'../../public/img/user_avatars/avatar_11.png',
	'../../public/img/user_avatars/avatar_12.png',
	'../../public/img/user_avatars/avatar_13.png',
	'../../public/img/user_avatars/avatar_14.png',
	'../../public/img/user_avatars/avatar_15.png',
];

const getRandomImage = () => {
	const randomIndex = Math.floor(Math.random() * imageFilenames.length);
	return `/img/${imageFilenames[randomIndex]}`;
};

export const SmallCard: React.FC<smallCardProps> = ({
	id,
	userId,
	publicKey,
	title = 'No Title available.',
	flashcards,
	amountOfCorrectAnswers,
	amountOfIncorrectAnswers,
	amountOfCompletedRuns,
	isPublic,
	description = 'No description available.',
	cardCount,
	colorClass,
	className,
	imageUrl = getRandomImage(),
	...restProps
}) => {
	console.log('SmallCard props:', title, description, cardCount, className);
	return (
		<div className="small-card-container" data-count={cardCount}>
			<div className={`small-card${className}`}>
				{<img src={imageUrl} alt="Thumbnail" className="small-card__image" />}
				<div className="small-card__content">
					<h3 className="small-card__title">{title}</h3>
					<p className="small-card__description">{description}</p>
					<span className="small-card__icon">
						{' '}
						<HeartButton />
					</span>{' '}
					<div className="small-card__footer">
						<span className="small-card__total"></span>

						{/* Ensure this is visible */}
					</div>
				</div>
			</div>
		</div>
	);
};

interface SmallThumbProps {
	title?: string;
	description?: string;
}
const Thumbnail: React.FC<SmallThumbProps> = ({
	title = 'Card Title',
	description = "This is a brief description of the card content. It's concise and informative.",
	// imageUrl = 'https://via.placeholder.com/250x150',
}) => {
	return (
		<div className="thumbnail">
			<img src={'/#'} alt="Thumbnail" className="thumbnail__image" />
			<div className="thumbnail__content">
				<h3 className="thumbnail__title">{title}</h3>
				<p className="thumbnail__description">{description}</p>
			</div>
		</div>
	);
};

export default Thumbnail;

// export const SmallCard: React.FC<smallCardProps> = ({
// 	title = 'Collection Title',
// 	description = 'Brief description of the collection.',
// 	totalCards = 5,
// 	imageUrl = 'https://via.placeholder.com/250x150',
// }) => {
// 	return (
// 		<div className="small-card">
// 			<img src={imageUrl} alt="Thumbnail" className="small-card__image" />
// 			<div className="small-card__content">
// 				<h3 className="small-card__title">{title}</h3>
// 				<p className="small-card__description">{description}</p>
// 				<div className="small-card__footer">
// 					<span className="small-card__total">{totalCards} cards</span>
// 					<span className="small-card__icon">❤️</span>{' '}
// 					{/* Replace with your SVG icon */}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export const SmallCard: React.FC<smallCardProps> = ({
// 	title = 'Collection Title',
// 	description = 'Brief description of the collection.',
// 	totalCards = 5,
// 	imageUrl = 'https://via.placeholder.com/250x150',
// }) => {
// 	return (
// 		<div className="small-card-container" data-count={totalCards}>
// 			<div className="small-card">
// 				<img src={imageUrl} alt="Thumbnail" className="small-card__image" />
// 				<div className="small-card__content">
// 					<h3 className="small-card__title">{title}</h3>
// 					<p className="small-card__description">{description}</p>
// 					<div className="small-card__footer">
// 						<span className="small-card__icon">❤️</span>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const Thumbnail = () => {
// 	return (
// 		<div className="thumbnail">
// 			<div className="thumbnail__top"></div>
// 			<div className="thumbnail__center"></div>
// 		</div>
// 	);
// };

// export default Thumbnail;
