import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import getDataFromAPI from 'getAPI';
import Notiflix from 'notiflix';

import MainOfMovie from '../../components/MainOfMovie/MainOfMovie';

import md from './MovieDetails.module.css';

const MovieDetailes = ({ movieID }) => {
  const [mainAboutMovie, setMainAboutMovie] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getDataFromAPI(`movie/${movieID}`, `language=en-US`)
      .then(responce => {
        setMainAboutMovie(responce.data);
      })
      .catch(error => {
        Notiflix.Notify.warning(error.message);
      });
  }, [movieID]);

  return (
    <>
      <div className={md.back}>
        <NavLink to={location.state ?? '/'}>Back</NavLink>
      </div>
      <p>It's MovieDetailes</p>
      {<MainOfMovie mainData={mainAboutMovie} />}
      <ul className={md.link}>
        <li>
          <NavLink to="cast" state={location.state}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" state={location.state}>
            Review
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailes;
