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