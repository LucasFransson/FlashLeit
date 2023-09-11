import { Link } from 'react-router-dom';
// //function CardGrid({ items, Component, linkPrefix }) {

// function CardGrid({ items, Component, linkPrefix, onCardClick, styleClass }) {
function CardGrid({ items, Component, linkPrefix, onCardClick }) {
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
						<div
							className="card-editor__item"
							onClick={() => onCardClick && onCardClick(item)}
						>
							<Component {...item} />
						</div>
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
