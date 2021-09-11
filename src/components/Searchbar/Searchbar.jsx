//import React, { Component } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import * as moviesAPI from '../../services/Api'
import styles from './Searchbar.module.css';

// Компонент принимает один проп onSubmit - функцию для передачи значения инпута при сабмите формы. Создает DOM-элемент следующей структуры.
function Searchbar({ onSubmit }) {
  const history = useHistory();
  console.log(history);
  const location = useLocation();
  console.log(location);
  const [request, setRequest] = useState('');
  //const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   if (!request) return;
  //   moviesAPI.fetchSearch(request).then((data) => setMovies(data.result));

  // }, [request]);
  // console.log(movies);

  const handleChangeInput = e => {
    setRequest(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (request.trim() === '') {
      //   return alert('введите поиск');
      toast.warn('🦄 enter your request!', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        rtl: false,
        //progress: undefined,
      });
      return;
    }
    onSubmit(request);
    setRequest('');

    history.push({ ...location, search: `query=${request}` });
    console.log(history);
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Input your query..."
          value={request}
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
}

export default Searchbar;
