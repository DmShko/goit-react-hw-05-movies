import { useState } from 'react';

import getDataFromAPI from 'getAPI';
import Notiflix from 'notiflix';

import { ReactComponent as IconMenu } from '../components/images/search-com.svg';

const Movies = () => {
  const [inputValue, setInputValue] = useState('');
  // list of trending movies - 'movies'
  const [movies, setMovies] = useState([]);

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

//   useEffect(() => {
//     getInputMovie(movies);
//     console.log(movies);
//   },[inputValue]);

  return (
    <>
      <h1>Search movies</h1>
      <form onSubmit={getInputMovie}>
        <input
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
            <li key={element.id}>{element.original_title || element.name}</li>
          );
        })}
      </ul>
    </>
  );
};

export default Movies;
