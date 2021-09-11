import { useEffect, useState } from 'react';
import Searchbar from '../../components/Searchbar/Searchbar';
import MovieList from '../MovieList/MovieList';
import * as moviesAPI from '../../services/Api';

function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [request, setRequest] = useState('');

  useEffect(() => {
    if (!request) return;
    moviesAPI.fetchSearch(request).then(data => setMovies(data.results));
  }, [request]);
  //console.log(movies);

  // const handleChangeInput = e => {
  //   setRequest(e.currentTarget.value.toLowerCase());
  // };

  const handleFormSubmit = request => {
    if (request.trim() === '') {
      setRequest('');
    } else {
      setRequest(request);
      setMovies([]);
    }
  };
  return (
    <>
      {/* <h1>MOVIES</h1> */}
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      <MovieList movies={movies}></MovieList>
    </>
  );
}
export default MoviesPage;
