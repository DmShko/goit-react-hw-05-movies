import { useState, useEffect } from 'react';

import Notiflix from 'notiflix';
import getDataFromAPI from 'getAPI';

const Home = () => {
    
    // list of trending movies - 'movies'
    const [ movies, setMovies ] = useState([]);

    useEffect(() => {
        
        getDataFromAPI('trending/all/day', 'language=en-US').then(responce => {
               
            setMovies(responce.data.results);

        }).catch(error => {
            Notiflix.Notify.warning(error.message);
        });

    }, []);

    // useEffect(() => {
    //     console.log(movies);
    // }, [movies]);
    
    return(
        <>
            <p>Tranding today</p>

            <ul>
                {
                   movies.map(element => {
                        return <li key={element.id}>{element.original_title || element.name}</li>
                   }) 
                }
            </ul>
        </>
    );
}

export default Home;