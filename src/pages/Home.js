import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Notiflix from 'notiflix';
import getDataFromAPI from 'getAPI';

const Home = (parameters) => {
    
    // list of trending movies - 'movies'
    const [ movies, setMovies ] = useState([]);

    useEffect(() => {
        
        getDataFromAPI('trending/all/day', 'language=en-US').then(responce => {
            
            setMovies(responce.data.results);

        }).catch(error => {
            Notiflix.Notify.warning(error.message);
        });

    }, []);

    const linkClick = (evt) => {
        parameters.cahgeCurrentMovie(evt.target.id);
    };
    // useEffect(() => {
    //     console.log(movies);
    // }, [movies]);
    
    return(
        <>
            <p>Tranding today</p>

            <ul>
                {
                   movies.map(element => {
                        return( 
                            <li key={element.id}>
                                <NavLink to={`/movies/${element.id}`} onClick={linkClick} id={element.id}>{element.original_title || element.name}</NavLink>
                            </li>
                        )
                   }) 
                }
            </ul>
        </>
    );
}

export default Home;