import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import userIdReducer from "./userIdSlice";

export const store = configureStore({
	reducer: {
		// [usersApi.reducerPath]: usersApi.reducer,
		// [collectionsApi.reducerPath]: collectionsApi.reducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		userId: userIdReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
