import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom matchers
import Card from "./Card"; // Adjust the path to your Card component
import CardTypes from "../../types/CardTypes"; // Import the CardTypes interface

afterEach(cleanup);

describe("Card Component", () => {
	const mockCardProps: CardTypes = {
		id: 1,
		collectionId: 1,
		userId: 1,
		question: "Sample Question",
		answer: "Sample Answer",
		leitnerIndex: 0,
		lastReviewedDate: null,
		colorClass: "red",
		animationOnRendering: "draw",
	};

	it("renders Card component without errors", () => {
		render(<Card {...mockCardProps} />);
	});

	it("renders the question on the front side of the card", () => {
		const { getByText } = render(<Card {...mockCardProps} />);
		const questionElement = getByText("Sample Question");
		expect(questionElement).toBeInTheDocument();
	});

	it("should render the answer on the back side of the card when flipped", () => {
		const { getByText, getByRole } = render(<Card {...mockCardProps} />);
		const flipButton = getByRole("button", { name: "See Answer" });

		fireEvent.click(flipButton);

		const answerElement = getByText("Sample Answer");
		expect(answerElement).toBeInTheDocument();
	});

	it("should flip the card when the flip button is clicked", () => {
		const { getByRole, container } = render(<Card {...mockCardProps} />);
		const flipButton = getByRole("button", { name: "See Answer" });

		fireEvent.click(flipButton);

		expect(container.querySelector(".card.is-flipped")).toBeInTheDocument();
	});
});
