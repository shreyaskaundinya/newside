import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/',
    }),
    tagTypes: ['Articles', 'User', 'Comments'],
    endpoints: (builder) => ({
        signupUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'signup',
                    method: 'POST',
                    body: { data: user },
                };
            },
        }),
        loginUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'login',
                    method: 'POST',
                    body: { data: user },
                };
            },
            providesTags: ['User'],
        }),
        getLatestArticles: builder.query({
            query: () => 'latest',
            providesTags: (result, err, arg) =>
                result
                    ? [
                          ...result.articles.map(({ _id }) => ({
                              type: 'Articles',
                              _id,
                          })),
                          'Articles',
                      ]
                    : ['Articles'],
        }),
        getArticleComments: builder.query({
            query: (id) => `articlecomments/${id}`,
            providesTags: (result) => {
                return result.comments.length > 0
                    ? [
                          {
                              type: 'Comments',
                              id: result.comments[0].articleId,
                          },
                          'Comments',
                      ]
                    : ['Comments'];
            },
        }),
        addArticleComment: builder.mutation({
            query: (data) => ({
                url: `articlecomments/${data.articleId}`,
                method: 'POST',
                body: { data: data },
            }),
            invalidatesTags: (result) => {
                console.log(result);
                return result
                    ? [
                          { type: 'Comments', id: result.comment.articleId },
                          'Comments',
                      ]
                    : [];
            },
        }),
    }),
});

export const {
    useSignupUserMutation,
    useLoginUserMutation,
    useGetLatestArticlesQuery,
    useGetArticleCommentsQuery,
    useAddArticleCommentMutation,
} = appApi;
