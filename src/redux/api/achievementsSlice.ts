import AchievementTypes from "../../types/AchievementTypes";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllAchievements: builder.query<AchievementTypes[], void>({
			query: () => "api/achievements",
		}),
		getAchievementsByUserId: builder.query<AchievementTypes[], number>({
			query: userId => `api/achievements/${userId}`,
			providesTags: (result, error, userId) => [{ type: "Achievements", id: userId }],
		}),
		addAchievementToUser: builder.mutation<void, { userId: number; achievementId: number }>({
			query: ({ userId, achievementId }) => {
				return {
					url: `api/achievements/${userId}`,
					method: "POST",
					body: achievementId,
				};
			},
			invalidatesTags: (result, error, args) => [{ type: "Achievements", id: args.userId }],
		}),
	}),
});

export const { useGetAllAchievementsQuery, useGetAchievementsByUserIdQuery, useAddAchievementToUserMutation } = extendedApiSlice;
