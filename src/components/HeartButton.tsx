import React from 'react';

// Import SVGs as React components
import { ReactComponent as SvgOutline } from '../../public/svg/SVG/svgOutline.svg';
import { ReactComponent as SvgFilled } from '../../public/svg/SVG/svgFilled.svg';
import { ReactComponent as SvgCelebrate } from '../../public/svg/SVG/svgCelebrate.svg';

const HeartButton: React.FC = () => {
	return (
		<div title="Like" className="heart-container">
			<input id="1337" className="heart-container__checkbox" type="checkbox" />
			<div className="heart-container__svg-container">
				<SvgOutline className="heart-container__svg-outline" />
				<SvgFilled className="heart-container__svg-filled" />
				<SvgCelebrate className="heart-container__svg-celebrate" />
			</div>
		</div>
	);
};

export default HeartButton;
