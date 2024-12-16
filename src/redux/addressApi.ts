import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface IAddress {
    userId?: string,
    _id?: string,
    pincode: number,
    address: string,
    city: string,
    state: string,
    country: string,
    lastName: string,
    firstname: string,
    addressType: string,
    mobile: number,
    isDelete?: string,
}



export const addressApi = createApi({
    reducerPath: "addressApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://combine-backend.vercel.app/api/user", credentials: "include" }),
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/user", credentials: "include" }),
    tagTypes: ["address"],
    endpoints: (builder) => {
        return {
            getAddresses: builder.query({
                query: id => {
                    return {
                        url: `/get-address/${id}`,
                        method: "GET",
                        // body: addressData
                    }
                },
                transformResponse: (data: { result: IAddress[] }) => data.result,
                providesTags: ["address"]
            }),
            updateAddress: builder.mutation({
                query: addressData => {
                    return {
                        url: "/update-address",
                        method: "POST",
                        body: addressData
                    }
                },
                invalidatesTags: ["address"]
            }),
            addAddress: builder.mutation({
                query: addressData => {
                    return {
                        url: "/add-address",
                        method: "POST",
                        body: addressData
                    }
                },
                invalidatesTags: ["address"]
            }),
            deleteAddress: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-address/${id}`,
                        method: "DELETE",
                        // body: addressData
                    }
                },
                invalidatesTags: ["address"]
            }),

        }
    }
})

export const {
    useGetAddressesQuery,
    useAddAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation
} = addressApi
