import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import getDataFromAPI from 'getAPI';
import Notiflix from 'notiflix';

import { ReactComponent as IconMenu } from '../components/images/search-com.svg';
import { NavLink } from 'react-router-dom';

const Movies = (parameters) => {
  
  const [inputValue, setInputValue] = useState('');
  // list of trending movies - 'movies'
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const changeInput = (evt) => {
    if(evt.target.value !== 0) setInputValue(evt.target.value);
  };

  useEffect(() => {
   
    if(searchParams.get('query') !== null){getDataFromAPI('search/movie',`query=${searchParams.get('query')}&include_adult=false&language=en-US`)
    .then(responce => {
      setMovies(responce.data.results);
    })
    .catch(error => {
      Notiflix.Notify.warning(error.message);
    });}
  },[searchParams])

  const getInputMovie = evt => {
    evt.preventDefault();

    setSearchParams({query: evt.target.search.value});

    
  };

  const linkClick = (evt) => {
    
    parameters.cahgeCurrentMovie(evt.target.id);
  };

  return (
    <>
      <h1>Search movies</h1>
      <form onSubmit={getInputMovie}>
        <input
          name='search'
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

      <ul>
        {movies.map(element => {
          return (
            
            <li key={element.id}>
              <NavLink to={`/movies/${element.id}`} onClick={linkClick} id={element.id}>{element.original_title || element.name}</NavLink>
            </li>
            
          );
        })}
      </ul>
    </>
  );
};

export default Movies;
