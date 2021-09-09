import { useState, useEffect } from 'react';
//import { useParams} from 'react-router-dom';
import * as moviesAPI from '../../services/Api';

function Cast({ movieId }) {
  //const { url } = useRouteMatch();
  const [cast, setCast] = useState(null);
  //const { movieId } = useParams();

  useEffect(() => {
    //console.log(movies);
    moviesAPI.fetchCast(movieId).then(data => setCast(data.cast));
  }, [movieId]);
  console.log(cast);

  return (
    <>
      {cast && (
        <ul>
          {cast.map(men => (
            <li key={men.id}>
              <img src={men.poster_path} alt={men.name} />
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
