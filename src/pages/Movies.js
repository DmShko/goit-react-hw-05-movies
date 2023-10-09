import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

import getDataFromAPI from 'getAPI';
import Notiflix from 'notiflix';

import { ReactComponent as IconMenu } from '../components/images/search-com.svg';
import { NavLink } from 'react-router-dom';

import mov from './Movies.module.css';

const Movies = parameters => {
  const [inputValue, setInputValue] = useState('');
  // list of trending movies - 'movies'
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const changeInput = evt => {
    if (evt.target.value !== 0) setInputValue(evt.target.value);
  };

  useEffect(() => {
    // getDataFromAPI( , for delete '?query=' URL parameter, when input empty)
    getDataFromAPI(
      'search/movie',
      searchParams.get('query') !== null
        ? `query=${searchParams.get(
            'query'
          )}&include_adult=false&language=en-US`
        : ''
    )
      .then(responce => {
        setMovies(responce.data.results);
      })
      .catch(error => {
        Notiflix.Notify.warning(error.message);
      });
  }, [searchParams]);

  const getInputMovie = evt => {
    evt.preventDefault();

    setSearchParams(
      evt.target.search.value !== '' ? { query: evt.target.search.value } : {}
    );
  };

  const linkClick = evt => {
    parameters.cahgeCurrentMovie(evt.target.id);
  };

  return (
    <>
      <h1>Search movies</h1>
      <form onSubmit={getInputMovie}>
        <input
          name="search"
          type="text"
          value={inputValue}
          onChange={changeInput}
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
        ></input>
        <button type="submit">
          <IconMenu width="25px" height="25px" />
        </button>
      </form>
      <Suspense fallback={<div>Loading...</div>}>
        <ul className={movies.length !== 0 ? mov.list : ''}>
          {movies.map(element => {
            return (
              <li key={element.id}>
                <NavLink
                  className={mov.item}
                  to={`/movies/${element.id}`}
                  onClick={linkClick}
                  id={element.id}
                  state={
                    location.pathname + `?query=${searchParams.get('query')}`
                  }
                >
                  {element.original_title || element.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </Suspense>
    </>
  );
};

export default Movies;
