import React from 'react';

const WaveBackground = ({ children }) => {
	return (
		<div className="container__position">
			<div className="container__wave"></div>
			{children}
		</div>
	);
};

export default WaveBackground;
