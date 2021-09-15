import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Searchbar from '../../components/Searchbar/Searchbar';
import MovieList from '../../components/MovieList/MovieList';
import * as moviesAPI from '../../services/Api';
//import queryString from 'query-string';
const queryString = require('query-string');
//console.log(location.search);
// const parsed = queryString.parse(location.search);
// const stringified = queryString.stringify(parsed);
// console.log(parsed);
// location.search = stringified;
// note that `location.search` automatically prepends a question mark
//const { search } = location;
function MoviesPage() {
  const history = useHistory();
  const location = useLocation();

  const { query } = queryString.parse(location.search);
  console.log('LOCATIONSEARCH', location.search);
  const [movies, setMovies] = useState(null);
  const [request, setRequest] = useState(query || '');

  useEffect(() => {
    if (!request) return;
    moviesAPI
      .fetchSearch(request)
      .then(data => setMovies(data.results))
      .catch(error => console.log(error));
  }, [request]);
  //console.log(movies);

  // const handleChangeInput = e => {
  //   setRequest(e.currentTarget.value.toLowerCase());
  // };

  const handleFormSubmit = query => {
    // if (request.trim() === '') {
    //   setRequest('');
    // } else {

    setRequest(query);
    setMovies([]);
    history.push({ ...location, search: `query=${query}` });
  };
  //};
  return (
    <>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      <MovieList movies={movies}></MovieList>
    </>
  );
}
export default MoviesPage;
