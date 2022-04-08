import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const horecaApi = createApi({
    reducerPath: 'horeca',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://mate-uber-eats-api.herokuapp.com/api/v1/' }),
    endpoints: (builder) => ({
        getHoreca: builder.query({
            query: (id) => `restaurants${id ? `?location=${id}` : ""}`
        }),
        getLocation: builder.query({
            query: () => 'locations',
        }),
        getPageDetails: builder.query({
            query: (id) => `restaurants/${id}`
        }),
        getProductDetails: builder.query({
            query: (id) => `menu-items/${id}`
        })
    })
})

export const {  useGetHorecaQuery, 
                useGetLocationQuery, 
                useGetPageDetailsQuery,
                useGetProductDetailsQuery 
             } = horecaApi;
