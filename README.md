# movie-library-app

# Introduction

At the beginning, I create the server´s backend with Nest.js. I add Nest to my global dependencies through

npm i -g @nestjs/cli

And then I create the server folder with the help of Nest

nest new server

Nest creates an app with TS files so we can work with Typescript

Second, I create the frontend folder with this command:

npx create-react-app frontend --template typescript

When the installation ends, I install some libraries: React Hook Form, MUI styled components, Redux Toolkit and other libraries that I will need for fulfilling the technical challenges to create a movie´s library with filtering tools.

We don´t have a local database because all the data is retrieved from The Movie DB (TMDB) api. All of the requests of this app are executed with GET methods.

# Frontend - First steps

I create a routes.tsx where the app´s routes are going to be resolved. We import Suspense and lazy so we can load our components with lazy loading and wait until our components are fully available.

# routes.tsx

```c
const Home = lazy(() => import('./components/home/home'));
const Login = lazy(() => import('./components/login/login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    )
  },
  {
    path: '/home',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    )
  }
]);
```

```c
And we create our React Router to be exported and used by our index.tsx

const App_Routes = () => {

  return (
    <RouterProvider router={router} />
  );
};

export default App_Routes;
```

# Login

After creating the routing of our App, I began to create a dummy login with React Hook Forms. At home component , we will use again React Hook Forms to create forms with querys to filter the movies list. To style the differents parts of the app, I use styled components provided by Material UI so it can create nice designs not just for PCs but also for tablets or moviles, although we have to adjust some styles to create the most responsive app. One example of styled components:

```c
const Card = styled(MuiCard)(({ theme }: any) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));
```

And we use it in the app:

<Card variant="outlined"></Card>

To use Reack Hook Form, we import the hook and we use along the component:

```c
import { useForm } from 'react-hook-form';
```

We declare the inputs of the form

```c
type Inputs = {
    user: string
    password: string
}
```

And we use the useForm hook with the corresponding FormControl for styling and form´s logic purpose

```c
const Login = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit((data) => {
        navigate('/home');
    })}>
      <FormControl>
        <FormLabel htmlFor="user_name">User</FormLabel>
          <TextField
          type="text"
          className="form-control"
          id="user_name"
          {...register("user", {required: true})}
          required
          variant="outlined"
          autoFocus
          />
      </FormControl>

      <FormControl>
        <FormLabel>Password</FormLabel>
        <TextField
        type="password"
        id="user_password"
        {...register("password", {required: true})}
        required
        fullWidth
        variant='outlined'
        />
      </FormControl>
      {errors.user && <span>User is required</span>}
      {errors.password && <span>Password is required</span>}
    </form>
  )
}
```

# Server - First steps

For retrieving movies and genres, I needed to create controller and service that are linked in the app.module.ts of the Nest.js App. 

# Movie.controller.ts

To do it, first I create the controller with this command:

nest g controller movies

And I create the different routes and HTTP methods that are going to be used with the help of services

```c
@Controller('/movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('/toprated')
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get('/:id')
  async findOneById(@Param('id') id: number): Promise<Movie[]> {
    return await this.moviesService.findOneById(id);
  }
}
```

# Movie.service.ts

To create the movie service, I used this command:

nest g service movies

And after creating the movies.service.ts, I implemented the REST methods with help of HTTP axios library and the AxiosRequestConfig for creating the headers. The authorization token is needed when we have to call external APIs.

```c
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';

@Injectable()
export class MoviesService {
  private readonly movies: Movie[] = [];
  private readonly logger = new Logger(MoviesService.name);
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Movie[]> {
    const headers: AxiosRequestConfig = {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWE4NWU4ZDUwOTc4YTg2MDZlYjM1OGE3YTliM2NmMiIsIm5iZiI6MTcyNjczMTU1My4yODI4NTIsInN1YiI6IjY2ZWJkMjdlNTE2OGE4OTZlMTFmZGE3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rsDAd5YKho9klASxGdYJWQxNQKBzCEmyCe9wWoZPkoQ',
      },
    };
    const { data } = await firstValueFrom(
      this.httpService
        .get<
          Movie[]
        >('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', headers)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}

```

I created another folder for movies genres, so I can retrieve genres for the movies, map the corresponding ids with its genre´s name and to filter movies genres.

One important thing to work along the different browsers is that in our main.ts, we have to enable CORS so our request don´t have error

# main.ts

```c
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // If we not enable CORS , we will have errors in browsers with CORS
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
```

# Second part, integrating our services with the frontend with help of Redux, Redux toolkit (RTK) and RTK Query

Calling our services doesn´t need to integrate with Redux , specially in small projects or technical challenges but it´s
one of the best solutions when we have multiple states and the state management begins to grow exponentially. For example we can call our service with axios library:

```c
const data = await axios.get('API_URL/toprated');
```

But in this app, I create a store to follow the Redux´s architecture and use RTK Query. To begin with this development, I create the movies-api.tsx to be linked with your API_URL that it will the baseUrl and the endpoints associated to our controllers Movies and Genres

# movies-api.tsx

```c
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'API_URL' }),
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
```

# store.tsx

After creating the API, we configure the store that is going to be used inside our app:

```c
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { moviesApi } from './movies-api';

export const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(moviesApi.middleware)
})

setupListeners(store.dispatch)

```

And finally and not least important, we introduce the store in the Provider tag given by react-redux inside the root index.tsx

# index.tsx

```c
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import reportWebVitals from './reportWebVitals';
import App_Routes from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App_Routes />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
```

Finally, we use our logic just created in the home.tsx, when we have done the dummy login:

# Home

We import our calls to the server just as React Hooks:

```c
import { useGetMoviesQuery } from './../../store/movies-api'
````

And we use it inside our home functional component

```c
const { data, error, isLoading } = useGetMoviesQuery();
```

And in my design´s decision, I decided to populate the UI with a table with the different movies retrieved from the TMDB´s API, my own API and the help of RTK Query Hooks.

```c

<TableBody>
    {data?.results
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row: any) => {
        return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.original_title}>
            {columns.map((column) => {
            const value = row[column.id];
            debugger;
            return (
                <TableCell key={column.id} align={column.align}>
                {column.format && typeof value === 'number'
                    ? column.format(value)
                    : null}
                {typeof value === 'string' && value.match(/\.(jpg|jpeg|png|gif|svg)$/i) ? <img src={'https://image.tmdb.org/t/p/w500${row.poster_path}'} width={200} height={150} alt="" /> : value}
                </TableCell>
            );
            })}
        </TableRow>
        );
    })}
</TableBody>
```




