// // .THEN / .CATCH
// import { useState, useEffect } from 'react';

// type FetchState<T> = {
// 	data: T | null;
// 	loading: boolean;
// 	error: Error | null;
// };

// const useFetch = <T,>(url: string, initialState: T | null): FetchState<T> => {
// 	const [data, setData] = useState<T | null>(initialState); // Variable for fetched data or initial state
// 	const [loading, setLoading] = useState<boolean>(true); // Indicator for whether the fetch operation is active or not
// 	const [error, setError] = useState<Error | null>(null); // Holds any error that might occur during the fetch operation

// 	useEffect(() => {
// 		console.log(`Fetching data from: ${url}`); // TODO: Remove this before launch to improve performance

// 		fetch(url)
// 			.then((response) => {
// 				// Check if response is OK before proceeding to parse it.
// 				if (!response.ok) {
// 					throw new Error(`Network response was not ok: ${response.statusText}`);
// 				}
// 				return response.json();
// 			})
// 			.then((jsonData: T) => {
// 				console.log('Fetched data:', jsonData); //TODO: Remove this before launch to improve performance
// 				setData(jsonData);
// 				setLoading(false);
// 			})
// 			.catch((err) => {
// 				// Convert err to Error if it's not already an instance of Error.
// 				const error: Error =
// 					err instanceof Error ? err : new Error(String(err));

// 				// Check for different specific errors and Log accordingly
// 				if (error instanceof SyntaxError) {
// 					console.error('Error parsing JSON:', error);
// 				} else {
// 					console.error('Fetch error:', error);
// 				}

// 				setError(error);
// 				setLoading(false);
// 			});
// 	}, [url]);

// 	return { data, loading, error }; // Return the state of the fetch operation.
// };

// export default useFetch;

// ASYNC / AWAIT
import { useState, useEffect } from 'react';

type FetchState<T> = {
	data: T | null;
	loading: boolean;
	error: Error | null;
};

const useFetch = <T,>(url: string, initialState: T | null): FetchState<T> => {
	const [data, setData] = useState<T | null>(initialState); // Variable for fetched data or initial state
	const [loading, setLoading] = useState<boolean>(true); // Indicator for whether the fetch operation is active or not
	const [error, setError] = useState<Error | null>(null); // Holds any error that might occur during the fetch operation

	useEffect(() => {
		// Declare an Async function for data fetching inside the useEffect
		const fetchData = async () => {
			console.log(`Fetching data from: ${url}`); // TODO: Remove this before launch to improve performance
			try {
				// Perform the fetch operation.
				const response = await fetch(url);
				// Parse the fetched data as JSON.
				const jsonData: T = await response.json();
				console.log('Fetched data:', jsonData); //TODO: Remove this before launch to improve performance

				// Update the state with the new/fetched data
				setData(jsonData);
				// Set loading state to false since fetch operation is completed
				setLoading(false);
			} catch (err) {
				// if the error is not of type Error, convert it to an Err
				const error: Error =
					err instanceof Error ? err : new Error(String(err));

				// Check for different specific errors and Log accordingly
				if (error instanceof SyntaxError) {
					console.error('Error parsing JSON:', error);
				} else {
					console.error('Fetch error:', error);
				}
				// Update the state with the error/s and set loading state to false since fetch operation is completed
				setError(error);
				setLoading(false);
			}
		};

		// Initiate the fetch operation (on mounting or whenever the URL changes).
		fetchData();
	}, [url]);

	return { data, loading, error }; // Return the state of the fetch operation.
};
export default useFetch;

// import { useState, useEffect } from 'react';

// type FetchState<T> = {
// 	data: T | null;
// 	loading: boolean;
// 	error: Error | null;
// };

// const useFetch = <T,>(url: string, initialState: T | null): FetchState<T> => {
// 	const [data, setData] = useState<T | null>(initialState);
// 	const [loading, setLoading] = useState<boolean>(true);
// 	const [error, setError] = useState<Error | null>(null);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			console.log(`Fetching data from: ${url}`);

// 			try {
// 				const response = await fetch(url);
// 				const jsonData: T = await response.json();
// 				console.log('Fetched data:', jsonData);

// 				setData(jsonData);
// 				setLoading(false);
// 			}
// 			catch (error) {
// 				if (error instanceof SyntaxError) {
// 			 		console.error('Error parsing JSON:', error);
// 				} else {
// 			 		console.error('Fetch error:', error);
// 			 	}
// 			 	setError(error);
// 		 	setLoading(false);
// 			}
// 		};

// 		fetchData();
// 	}, [url]);

// 	return { data, loading, error };
// };

// import { useState, useEffect } from 'react';

// type FetchState<T> = {
// 	data: T | null;
// 	loading: boolean;
// 	error: Error | null;
// };

// const useFetch = <T,>(url: string, initialState: T | null): FetchState<T> => {
// 	const [data, setData] = useState<T | null>(initialState);
// 	const [loading, setLoading] = useState<boolean>(true);
// 	const [error, setError] = useState<Error | null>(null);

// 	useEffect(() => {
// 		console.log(`Fetching data from: ${url}`);

// 		fetch(url)
// 			.then((response) =>
// 				response
// 					.json()
// 					.then((jsonData: T) => {
// 						console.log('Fetched data:', jsonData);
// 						setData(jsonData);
// 						setLoading(false);
// 					})
// 					.catch((error) => console.error('Error parsing JSON:', error)));
// 					setError(error);
// 					setLoading(false);
// 				})

// 			.catch((error) => console.error('Fetch error:', error);setError(error);setLoading(false);
// });
// 	}, [url]);

// 	return {data,loading,error};
// };

//////////////////////

// Custom WebHook for fetching & deserializing JSON from an API
// const useFetch = <T,>(url: string, initialState: T) => {
// 	const [data, setData] = useState<T>(initialState);

// 	useEffect(() => {
// 		console.log(`Fetching data from: ${url}`);

// 		fetch(url)
// 			.then((response) =>
// 				response
// 					.json()
// 					.then((jsonData: T) => {
// 						console.log('Fetched data:', jsonData);
// 						setData(jsonData);
// 					})
// 					.catch((error) => console.error('Error parsing JSON:', error))
// 			)
// 			.catch((error) => console.error('Fetch error:', error));
// 	}, [url]);

// 	return data;
// };

// export default useFetch;
