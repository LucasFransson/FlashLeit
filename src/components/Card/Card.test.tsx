//@ts-ignore
// import React from 'react';
// import { render } from '@testing-library/react';
// import Card from './Card';

// test('renders Card component without errors', () => {
// 	const mockCardProps = {
// 		Id: 1,
// 		Question: 'Sample Question',
// 		CorrectAnswer: 'Sample Answer',
// 		WrongAnswer1: null,
// 		WrongAnswer2: null,
// 		WrongAnswer3: null,
// 		CollectionId: 1,
// 		ColorClass: 'red',
// 	};

// 	render(<Card {...mockCardProps} />);
// });

// @ts-ignore
// import React from 'react';
// import { render, cleanup } from '@testing-library/react';
// import Card from './Card';

// afterEach(cleanup);

// test('renders Card component without errors', () => {
// 	const mockCardProps = {
// 		Id: 1,
// 		Question: 'Sample Question',
// 		CorrectAnswer: 'Sample Answer',
// 		WrongAnswer1: null,
// 		WrongAnswer2: null,
// 		WrongAnswer3: null,
// 		CollectionId: 1,
// 		ColorClass: 'red',
// 	};

// 	render(<Card {...mockCardProps} />);
// });

// import React from 'react';
// import { render } from '@testing-library/react';
// import Card from './Card';

// test('renders Card component without errors', () => {
// 	const mockCardProps = {
// 		Id: 1,
// 		Question: 'Sample Question',
// 		CorrectAnswer: 'Sample Answer',
// 		WrongAnswer1: null,
// 		WrongAnswer2: null,
// 		WrongAnswer3: null,
// 		CollectionId: 1,
// 		ColorClass: 'red',
// 	};

// 	render(<Card {...mockCardProps} />);
// });

// // @ts-ignore
import React, { useState } from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card component', () => {
	const mockCardProps = {
		Id: 1,
		Question: 'What is the capital of France?',
		CorrectAnswer: 'Paris',
		WrongAnswer1: null,
		WrongAnswer2: null,
		WrongAnswer3: null,
		CollectionId: 1,
		ColorClass: 'blue',
	};

	it('should render the question on the front side of the card', () => {
		const { getByText } = render(<Card {...mockCardProps} />);
		const questionElement = getByText('What is the capital of France?');
		expect(questionElement).toBeInTheDocument();
	});

	it('should render the answer on the back side of the card when flipped', () => {
		const { getByText, getByRole } = render(<Card {...mockCardProps} />);
		const flipButton = getByRole('button', { name: 'See Answer' });

		fireEvent.click(flipButton);

		const answerElement = getByText('Paris');
		expect(answerElement).toBeInTheDocument();
	});

	it('should flip the card when the flip button is clicked', () => {
		const { getByRole, container } = render(<Card {...mockCardProps} />);
		const flipButton = getByRole('button', { name: 'See Answer' });

		fireEvent.click(flipButton);

		expect(container.querySelector('.card.is-flipped')).toBeInTheDocument();
	});
});

afterEach(cleanup);

/////////////

// import React from 'react';
// import { render } from '@testing-library/react';
// import Card from './Card'; // Adjust the path if necessary

// describe('Card Component', () => {
// 	it('renders the question correctly', () => {
// 		const { getByText } = render(<Card />);
// 		expect(
// 			getByText('This is a question bla bla bla bla bla bla bla')
// 		).toBeInTheDocument();
// 	});

// 	it('renders the answer correctly', () => {
// 		const { getByText } = render(<Card />);
// 		expect(
// 			getByText('This is an answer bla bla bla bla bla bla bla')
// 		).toBeInTheDocument();
// 	});

// 	it('has the correct headings', () => {
// 		const { getByText } = render(<Card />);
// 		expect(getByText('Question')).toBeInTheDocument();
// 		expect(getByText('Answer')).toBeInTheDocument();
// 	});
// });
