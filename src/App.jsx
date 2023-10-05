import { useState } from "react";

import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import MovieDetails from "pages/MovieDetails";
import Movies from "pages/Movies";
import NotFound from "pages/NotFound";
import SharedLayout from './components/SharedLayout/SharedLayout';

export const App = () => {

  const [details, setDetails] = useState('');

  const currentMovieDetail = (data) => {
    setDetails(data);
  }

  return (
  <>
   <Routes>
    <Route path='/' element={<SharedLayout/>}>
      <Route index element={<Home cahgeCurrentMovie={currentMovieDetail}/>}/>
      <Route path='/movies' element={<Movies cahgeCurrentMovie={currentMovieDetail}/>}/>
      <Route path='/movies/:movieID' element={<MovieDetails movieID={details}/>}/>
      <Route path="*" element={<NotFound />} />
    </Route>
   </Routes>
  </>  
  );
};