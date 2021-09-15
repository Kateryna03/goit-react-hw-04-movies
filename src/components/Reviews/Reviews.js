import { useState, useEffect } from 'react';
//import { useParams} from 'react-router-dom';
import * as moviesAPI from '../../services/Api';

function Reviews({ movieId }) {
  //const { url } = useRouteMatch();
  const [reviews, setReviews] = useState([]);
  //const { movieId } = useParams();

  useEffect(() => {
    //console.log(movies);
    moviesAPI
      .fetchReviews(movieId)
      .then(data => setReviews(data.results))
      .catch(error => console.log(error));
  }, [movieId]);
  console.log(reviews);

  return (
    <div>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              {/* <img src={men.poster_path} alt={men.name} /> */}
              <h3>{author}</h3>
              <p>Content: {content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
}
export default Reviews;
