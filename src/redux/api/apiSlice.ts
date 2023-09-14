import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://flashleit.azure-api.net/",
		credentials: "include",
		prepareHeaders: (headers, { getState }) => {
			const idToken = (getState() as RootState).idToken.idToken;
			console.log(idToken);
			if (idToken) {
				headers.set("authorization", `Bearer ${idToken}`);
			}

			return headers;
		},
	}),
	tagTypes: ["Collection", "Users", "Achievements", "UserCollections"],
	endpoints: builder => ({}),
});
