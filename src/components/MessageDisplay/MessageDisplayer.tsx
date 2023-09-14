import React from 'react';

const MessageDisplayer = () => {
	return (
		<div className="message-displayer">
			<div className="message-displayer__top">Top Different Color (Darker)</div>
			<h1>SUCCESS!</h1>
			<h3>Pat the user on the back here! Good job!</h3>
			<div className="message-displayer__main-content">
				<img
					src="/#"
					alt="Related SVG/IMG Display"
					className="message-displayer__svg"
				></img>

				<p className="message-displayer__text-content">
					Text Content Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					In nostrum qui, dolorem odit similique reprehenderit deserunt eaque
					dignissimos suscipit laboriosam?
				</p>
			</div>
			<div className="message-displayer__bottom">
				Bottom Different Color (Lighter)
				<button>Button Secondary</button>
				<button>Button Primary Action</button>
			</div>
		</div>
	);
};

export default MessageDisplayer;
