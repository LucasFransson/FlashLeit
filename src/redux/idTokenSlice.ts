import { createSlice } from "@reduxjs/toolkit";

interface IdTokenState {
	idToken: string;
}

const initialState = {
	idToken: "",
} as IdTokenState;

export const idTokenSlice = createSlice({
	name: "idToken",
	initialState,
	reducers: {
		setIdToken: (state, action) => {
			state.idToken = action.payload;
		},
	},
});

export const { setIdToken } = idTokenSlice.actions;

export default idTokenSlice.reducer;
