import FilmDetail from "./FilmDetail";
import FilmRow from "./FilmRow";
import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"

import './FilmLibrary.css'
import './FilmRow.css'
import {TMDB, TMDB_API_KEY} from "../TMDB"


function FilmLibrary(props) {
    const data = TMDB; 
    const APIKey = TMDB_API_KEY

    const [selectedFilm, setSelectedFilm] = useState(null); 
    const [favorites, setFavorites] = useState([]); 
    const [tab, setTab]= useState('all') //all | favs
    const [sortedMovie, setSortedMovie] = useState (data.films)
    
    // movilist equal to all or favs
    const movilist = tab === 'all'
      ? sortedMovie 
      : sortedMovie.filter(film => favorites.includes(film.id)) 
    
      const paramas = useParams()      

    useEffect(()=> {
      const sendParamsMovie = ()=> {
        const findMovie = sortedMovie.find((movie) => movie.id === paramas.filmId)
        setSelectedFilm(findMovie)
      }
      sendParamsMovie()
    },[paramas.filmId, sortedMovie])
      


    function handleFavAddClick(id) {
    const newFavorites = [...favorites, id];
    setFavorites(newFavorites);
  }

    const handleFavRemoveClick = (id) => {
      const newFavorites = favorites.filter(fav => fav !== id);
      setFavorites(newFavorites);
    }

    const handleTab = (e) => {
        const btnName = e.currentTarget.value
        setTab(btnName);
    }

    useEffect(()=> {
      const fetchSortedMovies = async () => {
        try{
          const url = `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022`

          const response = await fetch(url)
          const data = await response.json();
          setSortedMovie(data.results)
        }
        catch(err){
          console.log(err)
          throw err; 
        }
      }
      fetchSortedMovies()
    }, [])
     
    const selectedFilmItem = sortedMovie.find(film => film.id === selectedFilm)

    
  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button className={tab === 'all'? 'film-list-filter is-active': 'film-list-filter'} onClick={handleTab} value='all'>
            ALL
            <span className="section-count">{sortedMovie.length}</span>
          </button>
          <button className={tab === 'faves'? 'film-list-filter is-active': 'film-list-filter'} onClick={handleTab} value='faves'>
            FAVES
            <span className="section-count">{favorites.length}</span>
          </button>
        </div>

        {movilist.map((item) => (
          <FilmRow 
            title={item.title} 
            year={item.release_date} 
            posterpath={item.poster_path} 
            alt={item.tile} 
            key={item.id}
            id={item.id}
            onAddFavList={handleFavAddClick}
            onRemoveFavList={handleFavRemoveClick}
            isFavorite={favorites.includes(item.id)}
           />
        ))}

      </div>
      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        <FilmDetail passSelectedFilm={selectedFilmItem}/>
      </div>
    </div>
    
  );
}

export default FilmLibrary