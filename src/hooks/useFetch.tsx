// ASYNC / AWAIT
import { useState, useEffect } from 'react';

type FetchState<T> = {
	[x: string]: any;
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

// LOAD and ERROR in HOOK

// import React, { useState, useEffect } from 'react';
// import LoadingIcon from '../components/LoadingIcon';

// const useFetch = <T,>(url: string, initialState: T | null) => {
// 	const [data, setData] = useState<T | null>(initialState);
// 	const [loading, setLoading] = useState<boolean>(true);
// 	const [error, setError] = useState<Error | null>(null);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await fetch(url);
// 				const jsonData: T = await response.json();
// 				setData(jsonData);
// 				setLoading(false);
// 			} catch (err) {
// 				const error: Error =
// 					err instanceof Error ? err : new Error(String(err));
// 				setError(error);
// 				setLoading(false);
// 			}
// 		};

// 		fetchData();
// 	}, [url]);

// 	if (loading) {
// 		return <LoadingIcon />;
// 	}

// 	if (error) {
// 		return <div>Error: {error.message}</div>;
// 	}

// 	return data;
// };

// export default useFetch;

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
