import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "https://flashleit.azure-api.net/" }),
	tagTypes: ["Collection", "Users", "Achievements", "UserCollections"],
	endpoints: builder => ({}),
});
