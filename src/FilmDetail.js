import './FilmDetail.css'
import { TMDB_API_KEY, TMDB} from "./TMDB"
import {useEffect, useRef, useState} from 'react'
import {useParams } from "react-router-dom"

function FilmDetail(props) {
  const data = TMDB;
  const APIKey = TMDB_API_KEY
  const [movie, setMovie] = useState(data.films)
  const countRenders = useRef(0)

  const params = useParams()

  useEffect(() => {
    // count the number of renders
    countRenders.current = countRenders.current + 1
    
    const fetchMovies = async() => {
      try{
          const url = `https://api.themoviedb.org/3/movie/${params.filmId}?api_key=${APIKey}`
    
          const response = await fetch(url)
          if(response.ok){
            const data = await response.json();
            setMovie(data)
          }else{
            console.log('Invalid url')
          } 
      }
      catch(error) {
        console.log('error: ', error)
      }
    }
    // fix first render error
    fetchMovies()
   
  }, [APIKey, params.filmId])

  // show empty fildetail when there is not selection.
  if(Object.keys(params).length === 0){
    return <FilmDetailEmpty/>
  } 

    return (
      <div className="FilmDetail is-hydrated">
        <figure className="film-backdrop">
          <img src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} alt={movie.title} />
          <h1 className="film-title">{movie.title}</h1>
        </figure>
        <div className="film-meta">
          <h2>{movie.tagline}</h2>
          <p className="film-detail-overview">
            <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} className="film-detail-poster" alt={`poster${movie.title}`} />
            {movie.overview}
          </p>
        </div>
      </div>
    )
}

function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
    <p>
      <i className="material-icons">subscriptions</i>
      <span>No film selected</span>
    </p>
  </div>)
}

export default FilmDetail