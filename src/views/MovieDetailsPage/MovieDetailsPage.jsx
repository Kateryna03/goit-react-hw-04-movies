import { useState, useEffect } from 'react';
import {
  NavLink,
  useParams,
  useRouteMatch,
  Route,
  Switch,
} from 'react-router-dom';
import * as moviesAPI from '../../services/Api';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import s from './MovieDetailsPage.module.css';
function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMovieById(movieId).then(data => setMovie(data));
  }, [movieId]);
  console.log(movie);

  return (
    <div>
      {movie && (
        <>
          <div className={s.wrapper}>
            <div className={s.photoWrapper}>
              <img
                className={s.photo}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div>
              <h2>{movie.title}</h2>
              <p>
                User score: <span>{movie.vote_average}</span>
              </p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres &&
                  movie.genres.map(genre => (
                    <li key={genre.name}>{genre.name}</li>
                  ))}
              </ul>
            </div>
          </div>

          <hr />

          <p>Additional Information</p>
          <ul>
            <li>
              <NavLink to={`${url}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`${url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route path={`${url}/cast`}>
              <Cast movieId={movieId}></Cast>
            </Route>
            <Route path={`${url}/reviews`}>
              <Reviews movieId={movieId}></Reviews>
            </Route>
          </Switch>
          {/* <h1>{ movie.title}</h1>
            console.log('DETAILS') */}
        </>
      )}
    </div>
  );
}
export default MovieDetailsPage;
