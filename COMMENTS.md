# Creation of TMDB´s account
When we sign up, TMDB provides us with an API_KEY and a TOKEN_API to generate request. Without them, we will have 403s error for forbidden acces

API_KEY: 51a85e8d50978a8606eb358a7a9b3cf2
TOKEN_API: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWE4NWU4ZDUwOTc4YTg2MDZlYjM1OGE3YTliM2NmMiIsIm5iZiI6MTcyNjczMTMwNC43OTcyNzcsInN1YiI6IjY2ZWJkMjdlNTE2OGE4OTZlMTFmZGE3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ttD80kVZhXcC7b0y3c6PIEbLMyBeDFDjccm1OcMM2x8

# Integration of Material UI Styled Components

I have to do some things to integrate Material UI Styled Components.

npm install @mui/material @mui/styled-engine-sc styled-components

The main difference between this and the non-TypeScript example is that you need to add the following path config to your tsconfig.json:

"paths": {
  "@mui/styled-engine": ["./node_modules/@mui/styled-engine-sc"]
}
and install @types/styled-components:

npm install --save-dev @types/styled-components

Also I have to install @emotion/react @emotion/styled

# Adding images of TMDB library

If we want to add images to the app, we have to follow the instructions given in https://developer.themoviedb.org/docs/image-basics and specify good sizes of width and height. Most of them are png, jpg, jpegs and other formats , so they can
have lower qualities when sizes grow. SVG images don´t have those problems of resizing and they will maintain the quality

# Solving API calls

When I first began to search all the different calls that TMDB´s api, I realized that it was a call for fetching all the movies with different filter such as genres and so on but not for filtering title. You have to call another service if you want to retrieve movies by title but I didn´t found one service where you can search by title and by genres together. 
I thought of retrieving data for this service https://api.themoviedb.org/3/search/movie?query={your_title} and when I received the response, filtering the results based if the user has introduced genres for searching.
At the end I developed a solution where if you search by title, data from method service searchMovieByTitle will be given
and if the user wants to find by genres , data from method service findAll.

One of the improvements that I would have liked to do is that if user searchs by title and genres, the response from searchMovieByTitle will be filtered at the frontend regarding the genres chosen by the user. Now when the user searchs by title, it priorizes the name instead of the genres and if he wants to retrieve all the genres, no title has to be added at the form.

# Typing could be better

# Deploying and serving apps with Github pages

# Styling and creating a responsive app

One of the things that I didn´t achieve perfectly and I´m still working on it, it´s the app´s style. I have used 
nor styled components of Material UI and neither the Material UI library itself , so the app is not responsive and some things can be better designed. The main task was to achieve a correct logic with state management, get all bonus and option tasks possibles although I know that the design part is very important too, but this part can be made along the time.

# Docker image of the app

I couldn´t achieve this for now.
