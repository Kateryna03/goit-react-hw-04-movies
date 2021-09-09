import { useState, useEffect } from 'react';
//import { useParams} from 'react-router-dom';
import * as moviesAPI from '../../services/Api';

function Reviews({ movieId }) {
  //const { url } = useRouteMatch();
  const [reviews, setReviews] = useState(null);
  //const { movieId } = useParams();

  useEffect(() => {
    //console.log(movies);
    moviesAPI.fetchReviews(movieId).then(data => setReviews(data.results));
  }, [movieId]);
  console.log(reviews);

  return (
    <>
      {reviews && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              {/* <img src={men.poster_path} alt={men.name} /> */}
              <h3>{review.author}</h3>
              <p>Content: {review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default Reviews;
