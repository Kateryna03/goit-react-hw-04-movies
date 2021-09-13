import { useState, useEffect } from 'react';
import * as moviesAPI from '../../services/Api';
import MovieList from '../../components/MovieList/MovieList';
//import PageHeading from '../components/PageHeading/PageHeading';

function HomeView() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    //console.log(movies);
    moviesAPI.fetchTrendingToday().then(data => setMovies(data.results));
  }, []);
  console.log(movies);

  return (
    <>
      <h1>TRENDING TODAY</h1>
      <MovieList movies={movies}> </MovieList>
    </>
  );
}
export default HomeView;
