import { useEffect, useState } from "react";

import getDataFromAPI from 'getAPI';
import Notiflix from 'notiflix';

const Reviews = (movieID) => {

    const [reviewMovie, setReviewMovie] = useState();

    useEffect(() => {
        // console.log(parameters.movieID);
        getDataFromAPI(`movie/${movieID}/reviews`,`language=en-US`)
        .then(responce => {
            console.log(responce);
            setReviewMovie(responce);
        })
        .catch(error => {
          Notiflix.Notify.warning(error.message);
        });
    },[movieID]);

    return (

        <>
            <h2>Reviews</h2>
            <ul>
            {reviewMovie !== undefined ? reviewMovie.data.cast.map(
                value => {
                    return <li key={value.id}>
                        <img src={`https://image.tmdb.org/t/p/w500/${value.profile_path}`} alt='Actor foto'></img>
                        <p>{`Name:${value.name}`}</p>
                        <p>{`Character:${value.character}`}</p>
                    </li>}) : "Don't have any reviews..."
                }
            </ul>
        </>
        
    )
};

export default Reviews;