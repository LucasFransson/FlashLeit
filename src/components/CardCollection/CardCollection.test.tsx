//@ts-ignore
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CardCollection from './CardCollection';
import CardProps from '../../types/CardTypes';

describe('CardCollection', () => {
	const cards: CardProps[] = [
		{
			Id: 1,
			Question: 'Question 1',
			CorrectAnswer: 'Answer 1',
			WrongAnswer1: 'Wrong Answer 1',
			WrongAnswer2: 'Wrong Answer 2',
			WrongAnswer3: 'Wrong Answer 3',
			CollectionId: 1,
			ColorClass: 'random-color-class-1',
		},
		{
			Id: 2,
			Question: 'Question 2',
			CorrectAnswer: 'Answer 2',
			WrongAnswer1: 'Wrong Answer 1',
			WrongAnswer2: 'Wrong Answer 2',
			WrongAnswer3: 'Wrong Answer 3',
			CollectionId: 2,
			ColorClass: 'random-color-class-2',
		},
	];

	it('renders the Card component with the first card', () => {
		const { getByText } = render(<CardCollection cards={cards} />);
		expect(getByText('Question 1')).toBeInTheDocument();
	});

	it('renders the next card when the "Next Card" button is clicked', () => {
		const { getByText } = render(<CardCollection cards={cards} />);
		fireEvent.click(getByText('Next Card'));
		expect(getByText('Question 2')).toBeInTheDocument();
	});

	it('disables the "Next Card" button when it reaches the last card', () => {
		const { getByText } = render(<CardCollection cards={cards} />);
		fireEvent.click(getByText('Next Card'));
		expect(getByText('Next Card')).toBeDisabled();
	});
});
