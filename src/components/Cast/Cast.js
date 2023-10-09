import { useEffect, useState } from "react";

import getDataFromAPI from 'getAPI';
import Notiflix from 'notiflix';

import cast from './Cast.module.css'

const Cast = ({ movieID }) => {

    const [creditsMovie, setCreditsMovie] = useState();

    useEffect(() => {
      
        getDataFromAPI(`movie/${movieID}/credits`,`language=en-US`)
        .then(responce => {
           
            setCreditsMovie(responce);
        })
        .catch(error => {
          Notiflix.Notify.warning(error.message);
        });
    },[movieID]);

    return (

        <>
            <h2>Cast</h2>
            <ul className={cast.link}>
            {creditsMovie !== undefined ? creditsMovie.data.cast.map(
                value => {
                    return <li key={value.id}>
                        <img src={`https://image.tmdb.org/t/p/w500/${value.profile_path}`} alt='Actor foto'></img>
                        <p>{`Name:${value.name}`}</p>
                        <p>{`Character:${value.character}`}</p>
                    </li>}) : "Don't have any casts..."
                }
            </ul>
        </>
        
    )
};

export default Cast;