import { Link } from "react-router-dom";
import CardGridTypes from "../../types/CardGridTypes";

const CardGrid: React.FC<CardGridTypes> = ({
	items,
	Component,
	linkPrefix,
	parent,
	onCardClick,
	onDeleteClick,
	...restProps
}) => {
	return (
		<div className="grid-container">
			{items.map((item) => (
				<div
					className={`grid-container__item ${restProps.animationOnRendering}`}
					key={item.id}
				>
					{linkPrefix && parent === "discover" ? (
						<>
							{/* <button></button> */}
							<Link
								to={`/${linkPrefix}/${item.userId}/${item.id}`}
								onClick={() => onCardClick && onCardClick(item)}
							>
								<Component
									{...item}
									{...restProps}
									// animationOnRendering={animationOnRendering}
									// animationOnRendering={restProps.animationOnRendering}
								/>
								{/* <Component {...item} /> */}
							</Link>
						</>
					) : linkPrefix ? (
						<Link
							to={`/${linkPrefix}/${item.id}`}
							onClick={() => onCardClick && onCardClick(item)}
						>
							<Component {...item} {...restProps} />
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
								className={`card-editor__item ${restProps.animationOnRendering}`}
							>
								<Component
									{...item}
									animationOnRendering={restProps.animationOnRendering}
								/>
							</div>
						</>
					)}
				</div>
			))}
		</div>
	);
};

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
