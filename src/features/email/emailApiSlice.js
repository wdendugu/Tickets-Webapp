import { apiSlice } from "../../app/api/apiSlice"


export const emailApiSlice = apiSlice.injectEndpoints ({
    endpoints: builder => ({
        sendMail: builder.mutation ({
            query: ({ email, text }) => ({
                url: '/email',
                method: 'POST',
                body: { email, text }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id }
            ]
        }),
    }),
})

export const {
    useSendMailMutation,
} = emailApiSlice
