import { NavLink, Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import MovieDetails from "pages/MovieDetails";
import Movies from "pages/Movies";
import NotFound from "pages/NotFound";

export const App = () => {
  return (
  <>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/movies">Movies</NavLink>
    </nav>

   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/movies' element={<Movies/>}/>
    <Route path='/movies/:movieID' element={<MovieDetails/>}/>
    <Route path="*" element={<NotFound />} />
   </Routes>
  </>  
  );
};
