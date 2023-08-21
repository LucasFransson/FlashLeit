const colorClasses = [
	'azure',
	'skyblue',
	'navy',
	'aquamarine',
	'malachite',
	'pink',
	'gray',
	'lime',
	'yellow',
	'purple',
	'lilac',
	'maroon',
];

export const getRandomColorClass = () => {
	const randomClass =
		colorClasses[Math.floor(Math.random() * colorClasses.length)];
	return randomClass;
};
