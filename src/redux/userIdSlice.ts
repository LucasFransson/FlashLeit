import { createSlice } from "@reduxjs/toolkit";
import { getUserIdFromIdToken } from "../utils/getUserIdFromIdToken";

interface UserIdState {
	userId: number | undefined;
}

const initialState = {
	userId: undefined,
} as UserIdState;

export const userIdSlice = createSlice({
	name: "userId",
	initialState,
	reducers: {
		setUserIdFromToken: (state, action) => {
			state.userId = getUserIdFromIdToken(action.payload);
		},
	},
});

export const { setUserIdFromToken } = userIdSlice.actions;

export default userIdSlice.reducer;
