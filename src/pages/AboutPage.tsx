const About = () => {
	return (
		<div className="about-page">
			<div className='about-page__top'>
				<h1>Come meet the team:</h1>
			</div>
			<div className='about-page__blobs'>
				<div className='about-page__blob__wrapper'>
					<div className='about-page__image__wrapper'>
						<img src="/img/user_avatars/blob_calus.png" />
					</div>
					<h2>Calus</h2>
				</div>
				<div className='about-page__blob__wrapper'>
					<div className='about-page__image__wrapper'>
							<img src="/img/user_avatars/blob_pannbiff.png" />
					</div>
					<h2>Pannbiff</h2>
				</div>
				<div className='about-page__blob__wrapper'>
					<div className='about-page__image__wrapper'>
						<img src="/img/user_avatars/blob_halfdan.png" />
					</div>
					<h2>Halfd4n</h2>
				</div>
			</div>
			<div className='about-page__about'>
				<h3>FlashLeit is a fun and interactive way to practice memory retention.</h3>
				<h3>It gives the the user an opportunity to formulate and practice flashcards in an all-in personalized learning experience.</h3>
				<h3>So what are you waiting for? Come master your studies, one flash at a time!</h3>
			</div>
		</div>
	);
};

export default About;
