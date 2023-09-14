import AvatarTypes from "../../types/AvatarTypes";
import { apiSlice} from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllAvatars: builder.query<AvatarTypes[], void>({
      query: () => "api/avatars",
    })
  })
  });

export const { useGetAllAvatarsQuery} = extendedApiSlice;
