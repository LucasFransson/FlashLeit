import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import userIdReducer from "./userIdSlice";
import idTokenReducer from "./idTokenSlice";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		userId: userIdReducer,
		idToken: idTokenReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
