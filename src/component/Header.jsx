import { Link } from 'react-router-dom'
import "./Header.css"

function Header() {

  return (
    <div className='header-container'>
        <Link to={`/`} className='main-page'>Movie Searcher</Link>
        <Link to={`/search`} className='movie-search'>영화를 검색 해볼까요..?</Link>
    </div>
  )
}

export default Header