import './FilmRow.css'
import React, { useState} from 'react'

const FilmRow = (props)=> {
    const [ToggleBtn, setToggleBtn] = useState(false)
  
    return(
        <div>
            
        <div className="FilmRow" onClick={()=>props.onFilmDetailSelected(props.datavalue)}>
            <img src={`https://image.tmdb.org/t/p/w780/${props.posterpath}`} alt={props.alt} />
            <div className="film-summary">
                <h3>{props.title}</h3>
                <p>{(new Date(props.year)).getFullYear()}</p>
            </div>
            <button className="fave" onClick={()=>props.onAddFavList(props.datavalue, setToggleBtn(!ToggleBtn))}
            ><span className="material-icons">{!ToggleBtn ? 'add_to_queue' : 'remove_from_queue'}</span></button>
        </div>
    </div>
    )
}

export default FilmRow