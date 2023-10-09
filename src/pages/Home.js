import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Notiflix from 'notiflix';
import getDataFromAPI from 'getAPI';

import home from './Home.module.css';

const Home = parameters => {
  // list of trending movies - 'movies'
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getDataFromAPI('trending/all/day', 'language=en-US')
      .then(responce => {
        setMovies(responce.data.results);
      })
      .catch(error => {
        Notiflix.Notify.warning(error.message);
      });
  }, []);

  const linkClick = evt => {
    parameters.cahgeCurrentMovie(evt.target.id);
  };
  // useEffect(() => {
  //     console.log(movies);
  // }, [movies]);

  return (
    <>
      <p>Tranding today</p>

      <ul className={movies.length !== 0 ? home.list : ''}>
        {movies.map(element => {
          return (
            <li key={element.id}>
              <NavLink
                className={home.item}
                to={`/movies/${element.id}`}
                onClick={linkClick}
                id={element.id}
                state={location.pathname}
              >
                {element.original_title || element.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
