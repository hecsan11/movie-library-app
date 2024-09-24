import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getMovies: builder.query<any, void>({
      query: () => `movies/toprated`,
    }),
    getUpcomingMovies: builder.query<any, void>({
      query: () => `movies/upcoming`,
    }),
    getMovieById: builder.query<any, number>({
      query: (id) => `movies/${id}`,
    }),
    getMoviesGenres: builder.query<any, void>({
      query: () => `genres/movies`,
    })
  }),
})


export const { useGetMoviesQuery, useGetUpcomingMoviesQuery, useGetMovieByIdQuery, useGetMoviesGenresQuery} = moviesApi