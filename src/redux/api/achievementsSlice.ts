import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllAchievements: builder.query({
			query: () => "api/achievements",
		}),
		getAchievementsByUserId: builder.query({
			query: userId => `api/achievements/${userId}`,
		}),
		addAchievementToUser: builder.mutation({
			query: ({ userId, achievementId }) => {
				return {
					url: `api/achievements/${userId}`,
					method: "POST",
					body: achievementId,
				};
			},
		}),
	}),
});

export const { useGetAllAchievementsQuery, useGetAchievementsByUserIdQuery, useAddAchievementToUserMutation } = extendedApiSlice;
