import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moviesAPI from '../../services/Api';
//import PageHeading from '../components/PageHeading/PageHeading';

function HomeView() {
  //const { url } = useRouteMatch();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    //console.log(movies);
    moviesAPI.fetchTrendingToday().then(data => setMovies(data.results));
  }, []);
  console.log(movies);

  return (
    <>
      <h1>TRENDING TODAY</h1>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeView;

// export default function BooksView() {
//   const { url } = useRouteMatch();
//   const [books, setBooks] = useState(null);

//   useEffect(() => {
//     bookShelfAPI.fetchBooks().then(setBooks);
//   }, []);

//   return (
//     <>
//       <PageHeading text="Книги" />

//       {books && (
//         <ul>
//           {books.map(book => (
//             <li key={book.id}>
//               <Link to={`${url}/${book.id}`}>{book.title}</Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }
