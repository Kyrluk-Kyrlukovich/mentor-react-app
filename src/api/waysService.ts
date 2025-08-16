import { Way } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const waysService = createApi({
    reducerPath: 'waysService',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Ways'],
    endpoints: build => ({
        getWays: build.query<Way[], void>({
            query: () => '/ways',
            providesTags: ['Ways'],
        }),

        updateWay: build.mutation<string, Way>({
            query: way => ({
                url: `/ways/${way.id}`,
                method: 'PUT',
                body: way,
            }),
            invalidatesTags: ['Ways'],
        }),

        deleteWay: build.mutation<string, number>({
            query: id => ({
                url: `/ways/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Ways'],
        }),
    }),
});
