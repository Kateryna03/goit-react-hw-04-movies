import { useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';
import {
  NavLink,
  useParams,
  useRouteMatch,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import * as moviesAPI from '../../services/Api';
//import Cast from '../Cast/Cast';
//import Reviews from '../Reviews/Reviews';
import Loader from '../../components/Loader/Loader';
import s from './MovieDetailsPage.module.css';
const Cast = lazy(() => import('../../components/Cast/Cast.js'));
const Reviews = lazy(() => import('../../components/Reviews/Reviews.js'));
function MovieDetailsPage(page) {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesAPI
      .fetchMovieById(movieId)
      .then(data => setMovie(data))
      .catch(error => console.log(error));
  }, [movieId]);
  console.log(movie);

  const handleGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };
  console.log('LOCATION', location);

  return (
    <div>
      <button type="button" onClick={handleGoBack}>
        {' '}
        Go back
      </button>
      {movie && (
        <>
          <div className={s.wrapper}>
            <div className={s.photoWrapper}>
              <img
                className={s.photo}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path} `
                    : 'https://media.comicbook.com/files/img/default-movie.png'
                }
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
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location.state.from },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location.state.from },
                }}
                //  во время перехода на вложенные маршруты cast и review нужно ложить в стейт локейшн который возвращает пользователя на страницу со списком с которого была открыта карточка, чтобы при клике на кнопку GoBack пользователь мог вернуться на эту страницу
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          <hr />

          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path={`${url}/cast`}>
                <Cast movieId={movieId} page="/movies"></Cast>
              </Route>
              <Route path={`${url}/reviews`}>
                <Reviews movieId={movieId} page="/movies"></Reviews>
              </Route>
            </Switch>
          </Suspense>
          {/* <h1>{ movie.title}</h1>
            console.log('DETAILS') */}
        </>
      )}
    </div>
  );
}
export default MovieDetailsPage;
