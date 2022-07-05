import FilmDetail from "./FilmDetail";
import FilmRow from "./FilmRow";
import React, { useEffect, useState} from 'react'

import './FilmLibrary.css'
import './FilmRow.css'
import {TMDB} from "./TMDB"


function FilmLibrary(props) {
  const data = TMDB  

  const [selectedFilm, setSelectedFilm] = useState(null)
  const[Movilist, setMovilist] = useState([...data.films])
  const[favorites, setFavorites] = useState([])
    
  // console.log(props.datavalue.id)
  
  const handleFavAddClick = (datavalue, btnChange) => {

    // favorites.push(datavalue)

    // If the favorites have a duplicate
    const isrepeated = favorites.some((item, index) => index !== favorites.indexOf(item))
    console.log(isrepeated)

      // If favorite is duplicated, then set set new favoriteList without duplicates
    const FindDuplicates = (array) => array.filter((item, index)=> array.indexOf(item) !== index)

    const duplicateEl = FindDuplicates(favorites)

    if(duplicateEl.length > 0){
      const newFavoriteList = favorites.filter(
        (item)=> item.id !== datavalue.id
      )
      setFavorites(newFavoriteList)
    }else{
       // Add to favorites
    const newFavorites = [...favorites, datavalue]
    setFavorites(newFavorites)
    }
    
    console.log(duplicateEl)
  }
  useEffect(()=> {
    console.log(favorites)
  })

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button className="film-list-filter is-active" >
            ALL
            <span className="section-count">{data.films.length}</span>
          </button>
          <button className="film-list-filter" >
            FAVES
            <span className="section-count">{favorites.length}</span>
          </button>
        </div>

        {Movilist.map((item) => (
          <FilmRow 
            title={item.title} 
            year={item.release_date} 
            posterpath={item.poster_path} 
            alt={item.tile} 
            key={item.id} 
            onFilmDetailSelected={setSelectedFilm} 
            datavalue={item}
            onAddFavList= {handleFavAddClick}
           
           />
        ))}

      </div>
      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        <FilmDetail passSelectedFilm={selectedFilm}/>
      </div>
    </div>
    
  );
}

export default FilmLibrary