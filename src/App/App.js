import { lazy, Suspense } from 'react';
import Container from '../components/Container/Container';
import AppBar from '../components/AppBar/AppBar';
import { Route, Switch } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
//import HomeView from '../views/HomeView/HomeView';
//import MoviesPage from '../views/MoviesPage/MoviesPage';
//import MovieDetailsPage from '../views/MovieDetailsPage/MovieDetailsPage';
//import NotFoundView from '../views/NotFoundView/NotFoundView';
//import './App.css';

const HomeView = lazy(() => import('../views/HomeView/HomeView.jsx'));
const MoviesPage = lazy(() => import('../views/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() =>
  import('../views/MovieDetailsPage/MovieDetailsPage.jsx'),
);
const NotFoundView = lazy(() =>
  import('../views/NotFoundView/NotFoundView.jsx'),
);
//import { Fragment } from 'react';
//import { useState, useEffect } from 'react';
//import shortid from 'shortid';
//import * as Api from '../services/Api';
//import Searchbar from '../components/Searchbar';
//import Modal from '../components/Modal';
//import ImageGallery from '../components/ImageGallery';
//import { ToastContainer, toast } from 'react-toastify';
//import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
//import Button from '../components/Button/Button';

//import { Route } from 'react-router-dom';
// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };
export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomeView></HomeView>
          </Route>
          <Route path="/movies" exact>
            <MoviesPage></MoviesPage>
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage></MovieDetailsPage>
          </Route>
          <Route>
            <NotFoundView></NotFoundView>
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
