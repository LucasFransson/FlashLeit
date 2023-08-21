import { useState, useEffect } from 'react';

// Custom WebHook for fetching & deserializing JSON from an API
const useFetch = <T,>(url: string, initialState: T) => {
	const [data, setData] = useState<T>(initialState);

	useEffect(() => {
		console.log(`Fetching data from: ${url}`);

		fetch(url)
			.then((response) =>
				response
					.json()
					.then((jsonData: T) => {
						console.log('Fetched data:', jsonData);
						setData(jsonData);
					})
					.catch((error) => console.error('Error parsing JSON:', error))
			)
			.catch((error) => console.error('Fetch error:', error));
	}, [url]);

	return data;
};

// const useFetch = <T,>(url: string, initialState: T) => {
// 	const [data, setData] = useState<T>(initialState);

// 	useEffect(() => {
// 		fetch(url)
// 			.then((response) =>
// 				response
// 					.json()
// 					.then((jsonData: T) => {
// 						setData(jsonData);
// 					})
// 					.catch((error) => console.error(error))
// 			)
// 			.catch((error) => console.error(error));
// 	}, [url]);

// 	return data;
// };

export default useFetch;
