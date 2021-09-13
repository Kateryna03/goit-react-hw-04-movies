import { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import * as moviesAPI from '../../services/Api';
import MovieList from '../MovieList/MovieList';
//import PageHeading from '../components/PageHeading/PageHeading';

function HomeView() {
  //const { url } = useRouteMatch();
  const [movies, setMovies] = useState(null);
  //const history = useHistory()
  // history.push('/')

  useEffect(() => {
    //console.log(movies);
    moviesAPI.fetchTrendingToday().then(data => setMovies(data.results));
  }, []);
  console.log(movies);

  return (
    <>
      <h1>TRENDING TODAY</h1>
      <MovieList movies={movies}> </MovieList>
      {/* {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )} */}
    </>
  );
}
export default HomeView;
