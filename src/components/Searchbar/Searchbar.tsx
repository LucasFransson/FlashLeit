// import { ReactComponent as SearchIcon } from '/public/svg/SVG/search.svg';
//import { ReactComponent as SearchIcon } from '/public/svg/SVG/search.svg';

import { ReactComponent as SearchIcon } from "../../../public/svg/SVG/search.svg";

function SearchBar({ searchTerm, setSearchTerm, className }) {
	return (
		<form className={`search ${className}`}>
			<input
				type="text"
				className={`search__input `}
				placeholder="Search"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<SearchIcon className="search__icon" />
			<button className="search__button "></button>
		</form>
	);
}

export default SearchBar;
