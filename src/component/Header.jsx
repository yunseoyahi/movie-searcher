import { Link } from 'react-router-dom'
import "./Header.css"
import {useBookmark} from "../context/BookmarkContext";

function Header() {
  const {bookmarks}=useBookmark();
  return (
    <div className='header-container'>
        <Link to={`/`} className='main-page'>Movie Searcher</Link>
        <Link to={`/search`} className='movie-search'>영화를 검색 해볼까요..?</Link>
        <Link to={`/watchlist`} className='bookmarked-movie'>내가 찜한 영화({bookmarks.length})</Link>
    </div>
  )
}

export default Header