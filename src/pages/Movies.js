import { useState } from 'react';
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

  const getInputMovie = evt => {
    evt.preventDefault();
    getDataFromAPI('search/movie',`query=${inputValue}&include_adult=false&language=en-US`)
      .then(responce => {
        setMovies(responce.data.results);
      })
      .catch(error => {
        Notiflix.Notify.warning(error.message);
      });
  };

  const linkClick = (evt) => {
    setSearchParams(evt.target.search.value);
    parameters.cahgeCurrentMovie({query: evt.target.id});
  };

  // useEffect(() => {
    
  //   console.log(details);
  // },[details]);

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
