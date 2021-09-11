import { useEffect, useState } from 'react';
import Searchbar from '../../components/Searchbar/Searchbar';

import * as moviesAPI from '../../services/Api';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [request, setRequest] = useState('');

  useEffect(() => {
    //if (!request) return;
    moviesAPI.fetchOnSearch(request).then(data => setMovies(data.results));
  }, [request]);
  console.log(movies);

  const handleFormSubmit = request => {
    if (request.trim() === '') {
      setRequest('');
    } else {
      setRequest(request);
    }
  };
  return (
    <>
      {/* <h1>MOVIES</h1> */}
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
    </>
  );
}
export default MoviesPage;
