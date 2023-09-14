interface CardGridTypes {
	items: Array<any>;
	Component: React.ComponentType<any>; // Use ComponentType instead of Component
	//animationOnRendering: 'fade-in' | 'draw';
	linkPrefix?: string; // Optional prop
	onCardClick?: (item: any) => void; // Optional prop
	onDeleteClick?: (item: any) => void; // Optional prop
	[key: string]: any; // ANY additional properties
}
export default CardGridTypes;
