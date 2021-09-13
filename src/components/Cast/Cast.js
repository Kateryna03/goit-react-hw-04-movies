import { useState, useEffect } from 'react';
//import { useLocation, useHistory } from 'react-router-dom';
import * as moviesAPI from '../../services/Api';
import s from './Cast.module.css';
function Cast({ movieId }) {
  //const { url } = useRouteMatch();
  const [cast, setCast] = useState(null);
  //const location = useLocation();
  //const history = useHistory();
  //const { movieId } = useParams();

  useEffect(() => {
    //console.log(movies);
    moviesAPI.fetchCast(movieId).then(data => setCast(data.cast));
  }, [movieId]);
  console.log(cast);

  //history.push(location.state.from )
  //console.log(history);

  return (
    <>
      {cast && (
        <ul>
          {cast.map(men => (
            <li key={men.id}>
              {men.profile_path && (
                <img
                  className={s.photo}
                  //src={`https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg`}
                  src={`https://image.tmdb.org/t/p/w300${men.profile_path}`}
                  alt={men.name}
                />
              )}

              <h3>{men.name}</h3>
              <p>Character: {men.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default Cast;
