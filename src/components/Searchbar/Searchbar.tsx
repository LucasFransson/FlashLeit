// import { ReactComponent as SearchIcon } from '/public/svg/SVG/search.svg';

function SearchBar({ searchTerm, setSearchTerm }) {
	return (
		<form className="search">
			<input
				type="text"
				className="search__input"
				placeholder="Search"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			{/* <SearchIcon className="search__icon" /> */}
			<button className="search__button"></button>
		</form>
	);
}

export default SearchBar;
