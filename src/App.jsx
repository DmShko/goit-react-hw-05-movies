import { useState } from 'react';
import { lazy } from 'react';

import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import SharedLayout from './components/SharedLayout/SharedLayout';
import Cast from './components/Cast/Cast';
import Reviews from './components/Reviews/Reviews';

// lazy load
const Movies = lazy(() => import('pages/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));

export const App = () => {
  const [details, setDetails] = useState('');

  const currentMovieDetail = data => {
    setDetails(data);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={<Home cahgeCurrentMovie={currentMovieDetail} />}
          />
          <Route
            path="/movies"
            element={<Movies cahgeCurrentMovie={currentMovieDetail} />}
          />
          <Route
            path="/movies/:movieID/*"
            element={<MovieDetails movieID={details} />}
          >
            <Route path="cast" element={<Cast movieID={details} />} />
            <Route path="reviews" element={<Reviews movieID={details} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
