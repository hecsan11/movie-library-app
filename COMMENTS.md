API_KEY: 51a85e8d50978a8606eb358a7a9b3cf2
TOKEN_API: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWE4NWU4ZDUwOTc4YTg2MDZlYjM1OGE3YTliM2NmMiIsIm5iZiI6MTcyNjczMTMwNC43OTcyNzcsInN1YiI6IjY2ZWJkMjdlNTE2OGE4OTZlMTFmZGE3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ttD80kVZhXcC7b0y3c6PIEbLMyBeDFDjccm1OcMM2x8

I have to do some things to integrate Material UI Styled Components.

npm install @mui/material @mui/styled-engine-sc styled-components

The main difference between this and the non-TypeScript example is that you need to add the following path config to your tsconfig.json:

"paths": {
  "@mui/styled-engine": ["./node_modules/@mui/styled-engine-sc"]
}
and install @types/styled-components:

npm install --save-dev @types/styled-components