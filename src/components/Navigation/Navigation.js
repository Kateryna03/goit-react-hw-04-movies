import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav className={styles.nav}>
    <NavLink
      to="/"
      exact
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      HomePage
    </NavLink>
    <NavLink
      to="/movies"
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      MoviesPage
    </NavLink>
  </nav>
);

export default Navigation;

// '/' - компонент <HomePage>, домашняя страница со списком популярных кинофильмов.
// '/movies' - компонент <MoviesPage>, страница поиска фильмов по ключевому слову.
// '/movies/:movieId' - компонент <MovieDetailsPage>, страница с детальной информацией о кинофильме.
// /movies/:movieId/cast - компонент <Cast>, информация о актерском составе. Рендерится на странице <MovieDetailsPage>.
// /movies/:movieId/reviews - компонент <Reviews>, информация об обзорах. Рендерится на странице <MovieDetailsPage>.
