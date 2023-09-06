import { configureStore } from "@reduxjs/toolkit";
import { collectionsApi, usersApi } from "./api/apiSlice";
import userIdReducer from "./userIdSlice";

export const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
		[collectionsApi.reducerPath]: collectionsApi.reducer,
		userId: userIdReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersApi.middleware).concat(collectionsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
