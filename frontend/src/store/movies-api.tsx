import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  // We have to start the Nest app first locally on port 3000 or store the server in a
  // page such as Heroku or Openshift
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getMovies: builder.query<any, {page: number, genres: string}>({
      query: (arg) => {
        const  {page, genres} = arg;
        return {
          url: `movies/toprated`,
          params: {page, genres}
        }}
    }),
    getUpcomingMovies: builder.query<any, void>({
      query: () => `movies/upcoming`,
    }),
    getMovieById: builder.query<any, number>({
      query: (id) => `movies/${id}`,
    }),
    getMovieByTitle: builder.query<any, {query: string, page: number}>({
      query: (arg) => {
        const  {query, page} = arg;
        return {
          url: `movies/`,
          params: {query, page}
        }}
    }),
    getMoviesGenres: builder.query<any, void>({
      query: () => `genres/movies`,
    })
  }),
})


export const { useGetMoviesQuery, useGetUpcomingMoviesQuery, useGetMovieByIdQuery, useGetMoviesGenresQuery, useGetMovieByTitleQuery} = moviesApi