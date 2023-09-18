import AvatarTypes from "../../types/AvatarTypes";
import { apiSlice} from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllAvatars: builder.query<AvatarTypes[], void>({
      query: () => "api/avatars",
    }),
    getUserAvatars: builder.query<AvatarTypes[], {userId: number}>({
      query: userId => `api/avatars/${userId}`,
      providesTags: () => [{ type: "UserAvatars"}]
      }),
    addUserAvatarRelationship: builder.mutation<void, {userId: number, avatarId: number}>({
      query: ({ userId, avatarId}) => {
        return {
            url: `api/avatars/${userId}/?avatarId=${avatarId}`,
            method: "POST",
        };
      },
      invalidatesTags: () => [{type: "UserAvatars"}],
    })
  })
});
  

export const { useGetAllAvatarsQuery, useGetUserAvatarsQuery, useAddUserAvatarRelationshipMutation} = extendedApiSlice;
