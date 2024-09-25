import { Box, Button, Card, Checkbox, Chip, FormControl, FormLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableHead from "@mui/material/TableHead";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { useGetMoviesQuery, useGetMoviesGenresQuery, useGetMovieByTitleQuery } from './../../store/movies-api'
import { Controller, useForm } from "react-hook-form";

type Inputs = {
    title: string
    genres: string
}

interface Column {
    id: 'poster_path' | 'original_title' | 'genre_ids' | 'overview' | 'release_date' | 'vote_average' | 'vote_count';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'poster_path', label: 'Poster', minWidth: 170 },
    { id: 'original_title', label: 'Title', minWidth: 100 },
    { id: 'genre_ids', label: 'Genres', minWidth: 100 },
    {
      id: 'overview',
      label: 'Description',
      minWidth: 200
    },
    {
      id: 'release_date',
      label: 'Release Date',
      minWidth: 100
    },
    {
      id: 'vote_average',
      label: 'Average vote',
      minWidth: 100,
      format: (value: number) => value.toFixed(2),
    },
    {
      id: 'vote_count',
      label: 'Vote count',
      minWidth: 100,
      format: (value: number) => value.toFixed(2),
    }
];

const Home = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [pageServer, setPageServer] = useState(1);
    const [genres, setGenres] = useState(' ')
    const { data, error, isLoading } = useGetMoviesQuery({page: pageServer, genres: genres});
    const { data: dataGenres } = useGetMoviesGenresQuery();      
    const {register, control, getValues} = useForm<Inputs>();
    // Dummy call to avoid error
    const [initialRTKQuery, setRTKQuery] = useState('Matrix');
    const { data: dataQuery } = useGetMovieByTitleQuery({query: initialRTKQuery, page: pageServer});
    const [totalQuery, setTotalQuery] = useState(true);

    // Select component for genres
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };
    const [genreName, setGenreName] = useState<any[]>([]);

    const handleChange = (event: any) => {
        setGenreName(event.target.value);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const increase = () => {
        setPageServer(pageServer + 1);
        setPage(0);
    }

    const decrease = () => {
        if (pageServer >= 2){
            setPageServer(pageServer - 1)
        }
        setPage(0);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const sendSearchForm = () => {
        let formValues = getValues(["title","genres"]);
        if (formValues[0]){
            setTotalQuery(false);
            setRTKQuery(formValues[0]);
            setPageServer(1);
        } else if (typeof formValues[1] === 'object' && (formValues[1] as Array<number>).length > 0) {
            let genres = '';
            (formValues[1] as Array<number>).forEach((genre) => {
                genres = genres + genre + '%2C'
            })
            setGenres(genres);
            setTotalQuery(true);
            setPageServer(1);
        } else {
            setGenres('');
            setTotalQuery(true);
            setPageServer(1);
        }
    }

    return (
        <>
          <div>
            <form>
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Search movies
                    </Typography>
                    <Typography
                        component="h5"
                        variant="h5"
                        sx={{ width: '100%'}}
                    >
                        Choose one filter and search the movies
                    </Typography>
                    <Box
                        component="form"
                        sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
                    >
                        {/* Title */}
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <FormLabel htmlFor="movie_title">Title</FormLabel>
                                <TextField
                                type="text"
                                className="form-control"
                                id="movie_title"
                                {...register("title")}
                                variant="outlined"
                                autoFocus
                                />
                        </FormControl>

                        {/* Genres */}
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <FormLabel htmlFor="genres_movie">Genres</FormLabel>
                            <Controller
                            name="genres"
                            control={control}
                            render={({ field }) => (
                                <Select
                                {...field}
                                {...register("genres")}
                                multiple
                                labelId="multiple-checkbox-genres-label"
                                id="genres_movie"
                                value={genreName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((genreId: number) => (
                                        <Chip key={genreId} label={dataGenres?.genres.find((o: any) => o.id === genreId)!.name} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                    {dataGenres?.genres.map((genre: any) => (
                                        <MenuItem key={genre.id} value={genre.id}>
                                            <Checkbox checked={genreName.includes(genre.id)} />
                                            <ListItemText primary={genre.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                            />
                            
                        </FormControl>
                        <Button sx={{ m: 4, width: 300, height: 55 }} variant="contained" onClick={sendSearchForm}>Search</Button>
                    </Box>
                </Card>
            </form>
          </div>
          {error && <div>An error ocurred when retrieving the movies. Please retry again.</div>}
          {isLoading && <div>Loading...</div>}
          {!isLoading && <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 'auto' }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(totalQuery ?  data : dataQuery)?.results
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {columns.map((column) => {
                            let value = row[column.id];
                            if (typeof value === 'object' && value?.length && value.length > 0){
                                let genresMovie = '';
                                value?.forEach((element: any) => {
                                    dataGenres?.genres.forEach((genre: any) => {
                                        if (genre.id === element){
                                            genresMovie = genresMovie + genre.name + ', ';
                                        }
                                    })
                                });
                                value = genresMovie
                            }
                            if (column.id === 'release_date'){
                                value = value.split("-").reverse().join("/");
                            }
                            return (
                                <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : null}
                                {typeof value === 'string' && value.match(/\.(jpg|jpeg|png|gif|svg)$/i) ? <img src={`https://image.tmdb.org/t/p/w500${row.poster_path}`} width={200} height={150} alt="" /> : value}
                                </TableCell>
                            );
                            })}
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={(totalQuery ?  data : dataQuery)?.results.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Box
                sx={{ display: 'flex', flexDirection: 'row', gap: 2 , justifyContent: 'right'}}
            >
                <Button variant="contained" onClick={increase}>See next page</Button>
                <Button variant="contained" onClick={decrease}>See previous page</Button>
            </Box>
            </Paper>}
        </>
    );
}



export default Home;