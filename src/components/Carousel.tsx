import React, { useState, useRef } from 'react';
import Slider from 'react-slick';

export interface CarouselProps {
	// items: Array<any>;
	//slides: Array<any>; // Change this to the type of your slides if they're not strings
	//Component: React.FC<any>; // This will be your Card component or any other component
	items: Array<any> | null;
	Component: React.ComponentType<any>;
	className?: string;
	linkPrefix?: string; // Optional prop
	onCardClick?: (item: any) => void; // Optional prop
	onDeleteClick?: (item: any) => void; // Optional prop
	[propName: string]: any; // This allows for any additional props
}

const Carousel: React.FC<CarouselProps> = ({
	//slides,
	items,
	Component,
	className,
	linkPrefix,
	onCardClick,
	onDeleteClick,
	...restProps
}) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const mainSliderRef = useRef<Slider | null>(null);
	const navSliderRef = useRef<Slider | null>(null);
	const settingsMain = {
		ref: mainSliderRef,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplay: true,
		dots: true,
		centerMode: true,
		// centerPadding: '0 auto',

		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1,
				},
			},
		],
		focusOnSelect: true,
		arrows: true,
		infinite: true,
		speed: 150,
		fade: false,
		adaptiveHeight: true,
		afterChange: (current: number) => setCurrentSlide(current),
		asNavFor: navSliderRef.current as Slider | undefined,
	};

	const settingsNav = {
		ref: navSliderRef,
		slidesToShow: 7,
		slidesToScroll: 3,
		dots: false,
		focusOnSelect: true,
		infinite: true,
		centerMode: true,
		centerPadding: '20px',
		arrows: false,
		asNavFor: mainSliderRef.current as Slider | undefined,
		responsive: [],
	};

	console.log(items);
	return (
		<div className={className}>
			{onCardClick !== null ? (
				<Slider {...settingsMain}>
					{items.map((item, index) => (
						<div
							key={index}
							className={`carousel__slide carousel__slide--${index + 1}`}
						>
							<button
								onClick={() => onDeleteClick && onDeleteClick(item)}
								className="card-editor__item--delete"
							>
								X
							</button>
							<div
								onClick={() => onCardClick && onCardClick(item)}
								className={`card-editor__item ${className}`}
								//className={`card-editor__item ${animationOnRendering}`}
							>
								<Component
									{...item}
									{...restProps}
									//animationOnRendering={restProps.animationOnRendering}
									//animationOnRendering={animationOnRendering}
								/>
								{/* <Component {...item} /> */}
							</div>
						</div>
					))}
				</Slider>
			) : (
				<Slider {...settingsMain}>
					{items.map((item, index) => (
						<div
							key={index}
							className={`carousel__slide carousel__slide--${index + 1}`}
						>
							<Component {...item} {...restProps} />
						</div>
					))}
				</Slider>
			)}

			<Slider {...settingsNav}>
				{items.map((item, index) => (
					<div
						key={index}
						className={`carousel__nav-item carousel__nav-item--${index + 1}`}
					>
						<h2>
							<span>{index + 1}</span>
						</h2>
					</div>
				))}
			</Slider>
		</div>
	);
};
export default Carousel;
