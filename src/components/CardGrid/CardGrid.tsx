// import { Link } from 'react-router-dom';
// //function CardGrid({ items, Component, linkPrefix }) {

// function CardGrid({ items, Component, linkPrefix }) {
// 	return (
// 		<>
// 			<div className="grid-container">
// 				{items.map((item) => (
// 					<div className="grid-container__item" key={item.id}>
// 						<Link to={`/${linkPrefix}/${item.id}`}>
// 							<Component {...item} />
// 						</Link>
// 					</div>
// 				))}
// 			</div>
// 		</>
// 	);
// }

function CardGrid({ items, Component }) {
	return (
		<>
			<div className="grid-container">
				{items.map((item) => (
					<div className="grid-container__item" key={item.id}>
						<Component {...item} />
					</div>
				))}
			</div>
		</>
	);
}

export default CardGrid;
