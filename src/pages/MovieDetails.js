import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import getDataFromAPI from 'getAPI';
import Notiflix from 'notiflix';

import MainOfMovie from '../components/MainOfMovie/MainOfMovie'

const MovieDetailes = ({ movieID }) => {

    //const [movieView, setMovieView] = useState(false);
   const [mainAboutMovie, setMainAboutMovie] = useState([]);

    useEffect(() => {
        // console.log(parameters.movieID);
        getDataFromAPI(`movie/${movieID}`,`language=en-US`)
        .then(responce => {
            // console.log(responce);
            setMainAboutMovie(responce.data);
        })
        .catch(error => {
          Notiflix.Notify.warning(error.message);
        });
    },[movieID]);

    return(
        <>
            <p>It's MovieDetailes</p>
            {<MainOfMovie mainData={mainAboutMovie}/>}
            <ul>
                    <li><NavLink to='cast'>Cast</NavLink></li>
                    <li><NavLink to='reviews'>Review</NavLink></li>
            </ul>
            <Outlet/>
        </>
    );
}

export default MovieDetailes;