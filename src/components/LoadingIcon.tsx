import React from 'react';

function LoadingIcon() {
	return (
		<>
			<div className="loading__background">
				{/* <div className="loading__orbit"></div> */}
				<div className="loading"></div>
			</div>
			<span className="loading__text">LOADING...</span>
		</>
	);
}

export default LoadingIcon;

{
	/* <>
<div className="loading__background">
    <div className="loading__orbit"></div>
    <div className="loading"></div>
</div>
</> */
}
