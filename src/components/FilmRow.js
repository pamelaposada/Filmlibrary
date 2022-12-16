import './FilmRow.css'
import { Link} from "react-router-dom"

const FilmRow = (props)=> {
    
    const isFavorite = props.isFavorite;
  
    return(
        <div>
          
        <div className="FilmRow" >
        {/* onClick={()=>props.onFilmDetailSelected(props.id)}> */}
            <img src={`https://image.tmdb.org/t/p/w780/${props.posterpath}`} alt={props.alt} />
            <div className="film-summary">
                <h3>{props.title}</h3>
                <p>{(new Date(props.year)).getFullYear()}</p>   
                <Link to={`/films/${props.id}`} className="action"> 
                    <span className="material-icons">read_more</span>
                </Link>             
            </div>
            
        
            <button className="fave" onClick={(e)=> {
                e.stopPropagation()
                if (isFavorite) {
                    props.onRemoveFavList(props.id);
                } else {
                    props.onAddFavList(props.id)
                }
            }}
            ><span className="material-icons">{!isFavorite ? 'add_to_queue' : 'remove_from_queue'}</span></button>
        </div>
        
    </div>
    )
}

export default FilmRow