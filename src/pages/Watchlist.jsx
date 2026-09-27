import { useBookmark } from "../context/BookmarkContext";
import { Link } from "react-router-dom";
import "./Watchlist.css";

function Watchlist() {
  const {bookmarks, toggleBookmark}=useBookmark();

  return (
    <div className="watchlist-container">
      <h2>내가 찜한 영화 목록 ({bookmarks.length})</h2>
      {bookmarks.length===0? (
        <p>아직 찜한 영화가 없습니다.</p>):
        (
          <div className="bookmarked-movie-list">
            {bookmarks.map((movie)=>{
              const posterUrl= movie.poster_path? 
                    `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
                    "https://placehold.co/500x750?text=No+Image"; 
                  return(<Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                     <button className="bookmark-btn" 
                      onClick={(e)=>{
                        e.preventDefault();
                        toggleBookmark(movie);
                      }}>❤️</button>
                    <img src={posterUrl} alt={movie.title} className="movie-poster"></img>
                    <h4>제목: {movie.title}</h4>
                    <p>개봉 연도:{movie.release_date}</p>
                    <p>평점:{movie.vote_average} </p>
                  </Link>);
            })};
          </div>
        )
        }
    </div>
  );
}

export default Watchlist;