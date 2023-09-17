import React, { useState, useRef } from 'react';
import Slider from 'react-slick';

interface CarouselProps {
	slides: string[];
	className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ slides, className }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const mainSliderRef = useRef<Slider | null>(null);
	const navSliderRef = useRef<Slider | null>(null);
	const settingsMain = {
		ref: mainSliderRef,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		dots: true,
		centerMode: true,
		focusOnSelect: true,
		arrows: true,
		infinite: true,
		speed: 400,
		fade: false,
		adaptiveHeight: true,
		afterChange: (current: number) => setCurrentSlide(current),
		asNavFor: navSliderRef.current as Slider | undefined,
	};

	const settingsNav = {
		ref: navSliderRef,
		slidesToShow: 5,
		slidesToScroll: 1,
		dots: false,
		focusOnSelect: true,
		infinite: true,
		centerMode: true,
		arrows: false,
		asNavFor: mainSliderRef.current as Slider | undefined,
		responsive: [
			// ... your responsive settings
		],
	};

	return (
		<div className={className}>
			<Slider {...settingsMain}>
				{slides.map((slide, index) => (
					<div
						key={index}
						className={`carousel__slide carousel__slide--${index + 1}`}
					>
						<h2>{slide}</h2>
					</div>
				))}
			</Slider>

			<Slider {...settingsNav}>
				{slides.map((slide, index) => (
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
