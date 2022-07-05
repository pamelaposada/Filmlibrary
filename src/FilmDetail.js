import './FilmDetail.css'

function FilmDetail(props) {
  
  // console.log(props.selectedFilm)
  if(!props.passSelectedFilm){
    return FilmDetailEmpty()
  }
  

  return (
   
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img src={`https://image.tmdb.org/t/p/w1280/${props.passSelectedFilm.backdrop_path}`} alt={props.passSelectedFilm.title} />
        <h1 className="film-title">{props.passSelectedFilm.title}</h1>
      </figure>

      <div className="film-meta">
        <p className="film-detail-overview">
          <img src={`https://image.tmdb.org/t/p/w780/${props.passSelectedFilm.poster_path}`} className="film-detail-poster" alt={`poster${props.passSelectedFilm.title}`} />
          {props.passSelectedFilm.overview}
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

  </div>
  )
}

export default FilmDetail