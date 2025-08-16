import { Comment } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersService = createApi({
    reducerPath: 'usersService',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (build) => ({
        getComments: build.query<Comment[], void>({
            query: () => '/comments',
        }),
    }),
});