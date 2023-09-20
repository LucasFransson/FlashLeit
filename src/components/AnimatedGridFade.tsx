import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export interface AnimatedGridProps {
	items: Array<any>;
	Component: React.ComponentType<any>;
	linkPrefix?: string;
	onCardClick?: (item: any) => void;
	onDeleteClick?: (item: any) => void;
	[key: string]: any;
}

const AnimatedGridFade: React.FC<AnimatedGridProps> = ({
	items,
	Component,
	linkPrefix,
	onCardClick,
	onDeleteClick,
	...restProps
}) => {
	console.log(
		'AnimatedGridFade props:',
		items,
		Component,
		linkPrefix,
		onCardClick,
		onDeleteClick
	);

	useEffect(() => {
		const animateNext = () => {
			const nextContainer = document.querySelector('.container:not(.scale-in)');
			if (nextContainer) {
				nextContainer.classList.add('scale-in');
			}
			console.log('Next container to animate:', nextContainer);
		};

		const interval = setInterval(animateNext, 100);

		return () => clearInterval(interval);
	}, []);
	console.log(
		'AnimatedGridFade before return:',
		items,
		Component,
		linkPrefix,
		onCardClick,
		onDeleteClick
	);

	return (
		<div className={'grid-container--small'}>
			{items.map((item, i) => (
				<Link
					to={`/${linkPrefix}/${item.id}`}
					onClick={() => onCardClick && onCardClick(item)}
				>
					<Component {...item} {...restProps} />
					{/* // key={i}
					// item={item}
					// linkPrefix={linkPrefix}
					// onCardClick={() => onCardClick && onCardClick(item)}
					// onDeleteClick={() => onDeleteClick && onDeleteClick(item)}
                    </Link> */}
				</Link>
			))}
		</div>
	);
};

export default AnimatedGridFade;
