import mom from './MainOfMovie.module.css'

const MainOfMovie = ({ mainData }) => {
    
    // console.log(mainData.genres);
    return (
        <>
            <img className={mom.img} src={`https://image.tmdb.org/t/p/w500/${mainData.poster_path}`} alt="Movie poster"></img>
            <div>
                <h1>{mainData.title}</h1>
                <p></p>
                <h2>Overview</h2>
                <p>{mainData.overview}</p>
                <h2>Genres</h2>
                <ul className={mom.list}>
                    
                    {mainData.genres !== undefined ? mainData.genres.map(value => {
                            return <li key={value.id}><p>{value.name}</p></li>
                    }) : ''}
                    
                </ul>
               
            </div>      
        </>
    )

};

export default MainOfMovie;