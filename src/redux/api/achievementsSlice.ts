import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllAchievements: builder.query({
			query: () => "api/achievements",
		}),
		getAchievementsByUserId: builder.query({
			query: userId => `api/achievements/${userId}`,
			providesTags: (result, error, userId) => [{ type: "Achievements", id: userId }],
		}),
		addAchievementToUser: builder.mutation({
			query: ({ userId, achievementId }) => {
				return {
					url: `api/achievements/${userId}`,
					method: "POST",
					body: achievementId,
				};
			},
			invalidatesTags: (result, error, userId) => [{ type: "Achievements", id: userId }],
		}),
	}),
});

export const { useGetAllAchievementsQuery, useGetAchievementsByUserIdQuery, useAddAchievementToUserMutation } = extendedApiSlice;
