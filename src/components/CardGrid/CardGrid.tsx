import { Link } from 'react-router-dom';
// //function CardGrid({ items, Component, linkPrefix }) {

function CardGrid({
	items,
	Component,
	linkPrefix,
	onCardClick,
	onDeleteClick,
}) {
	return (
		<div className="grid-container">
			{items.map((item) => (
				// <div className={`grid-container__item ${styleClass}`} key={item.id}>
				<div className="grid-container__item" key={item.id}>
					{linkPrefix ? (
						<Link
							to={`/${linkPrefix}/${item.id}`}
							onClick={() => onCardClick && onCardClick(item)}
						>
							<Component {...item} />
						</Link>
					) : (
						<>
							<button
								onClick={() => onDeleteClick && onDeleteClick(item)}
								className="card-editor__item--delete"
							>
								X
							</button>
							<div
								onClick={() => onCardClick && onCardClick(item)}
								className="card-editor__item"
							>
								<Component {...item} />
							</div>
						</>
					)}
				</div>
			))}
		</div>
	);
}

export default CardGrid;

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

// export default CardGrid;

// function CardGrid({ items, Component, onCardClick }) {
//     return (
//         <div className="grid-container">
//             {items.map((item) => (
//                 <div className="grid-container__item" key={item.id}>
//                     <div onClick={() => onCardClick(item)}>
//                         <Component {...item} />
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default CardGrid;
