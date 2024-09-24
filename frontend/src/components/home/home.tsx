import { Button } from "@mui/material";
import axios from "axios";
import Table from '@mui/material/Table';
import TableHead from "@mui/material/TableHead";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { useGetMoviesQuery } from './../../store/movies-api'

interface Column {
    id: 'poster_path' | 'original_title' | 'genre_ids' | 'overview' | 'release_date' | 'vote_average' | 'vote_count';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'poster_path', label: 'Poster', minWidth: 170 },
    { id: 'original_title', label: 'Title', minWidth: 170 },
    { id: 'genre_ids', label: 'Genres', minWidth: 100 },
    {
      id: 'overview',
      label: 'Description',
      minWidth: 200,
      align: 'right'
    },
    {
      id: 'release_date',
      label: 'Release Date',
      minWidth: 170,
      align: 'right'
    },
    {
      id: 'vote_average',
      label: 'Average vote',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
    {
      id: 'vote_count',
      label: 'Vote count',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    }
];

// original_title' | 'genre_ids' | 'overview' | 'release_date' | 'vote_average' | 'vote_count'
interface Data {
    id: number;
    poster_path: string;
    original_title: string;
    genre_ids: string;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
}
  
function createData(
    id: number,
    poster_path: string,
    original_title: string,
    genre_ids: string,
    overview: string,
    release_date: string,
    vote_average: number,
    vote_count: number
): Data {
    return { id, poster_path, original_title, genre_ids, overview, release_date, vote_average, vote_count };
}

const rows = [
    createData(238, '/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg', 'The Godfather', '18, 80', 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone', '1972-03-14', 8.7, 20372),
];

const Home = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { data, error, isLoading } = useGetMoviesQuery();
    console.log(data);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>
          <div id="homeText">
            <h1>Home Page</h1>
            <Button fullWidth variant="contained" onClick={checkData}>See data</Button>
          </div>
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>}
        </>
    );
}

const checkData = async () => {
    const dataTopRated = await axios.get('http://localhost:3000/movies/toprated');
    console.log(dataTopRated);
    const dataUpcoming = await axios.get('http://localhost:3000/movies/upcoming');
    console.log(dataUpcoming);
    const dataQuery = await axios.get('http://localhost:3000/movies/', {params: {query: 'Matrix'}})
    console.log(dataQuery);
    const dataId = await axios.get('http://localhost:3000/movies/82690');
    console.log(dataId);
    const dataGenres = await axios.get('http://localhost:3000/genres/movies');
    console.log(dataGenres);
   /*  const dataAiringToday = await axios.get('http://localhost:3000/movies/airingtoday');
    console.log(dataAiringToday); */
}

export default Home;