import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/',
    }),
    tagTypes: ['Articles', 'User', 'Comments', 'Bookmarks'],
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

        updateUser: builder.mutation({
            query: ({ username, interests, name, id }) => {
                console.log(id);
                return {
                    url: `user/${id}`,
                    method: 'PUT',
                    body: {
                        data: { username, interests, name },
                    },
                };
            },
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
                return result?.comments.length > 0
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

        getWeatherData: builder.query({
            query: (location) => ({
                url: `weather`,
                method: 'POST',
                body: { data: { location } },
            }),
        }),

        getArticlesByTopic: builder.query({
            query: ({ topic, page = 1 }) => {
                console.log('fetching page', page);
                return {
                    url: `topicarticles/${topic}/${page}`,
                    method: 'GET',
                };
            },
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

        getArticlebyId: builder.query({
            query: (id) => ({
                url: `article/${id}`,
                method: 'GET',
            }),
            providesTags: (result, err, arg) =>
                result
                    ? [
                          { type: 'Articles', _id: result?.article?._id },
                          'Articles',
                      ]
                    : [],
        }),

        getUserBookmarks: builder.query({
            query: (id) => ({
                url: `bookmark/${id}`,
                method: 'GET',
            }),
            providesTags: (result, err) => {
                return result && !err
                    ? [
                          ...result.bookmarks.map((bookmark) => {
                              return {
                                  type: 'Bookmarks',
                                  _id: bookmark._id,
                              };
                          }),
                          'Bookmarks',
                      ]
                    : [];
            },
        }),

        updateBookmark: builder.mutation({
            query: (data) => {
                return {
                    url: `bookmark/${data.userId}`,
                    method: 'POST',
                    body: { data: { articleId: data.articleId } },
                };
            },
            invalidatesTags: (result) => {
                return result
                    ? [
                          'Bookmarks',
                          { type: 'Bookmarks', _id: result.data.bookmark._id },
                      ]
                    : [];
            },
        }),

        getExploreArticles: builder.query({
            query: () => {
                return {
                    url: `explore`,
                    method: 'GET',
                };
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
    useGetWeatherDataQuery,
    useGetArticlesByTopicQuery,
    useGetArticlebyIdQuery,
    useUpdateBookmarkMutation,
    useGetUserBookmarksQuery,
    useUpdateUserMutation,
    useGetExploreArticlesQuery,
} = appApi;
