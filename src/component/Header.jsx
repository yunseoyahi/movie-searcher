import { Link } from 'react-router-dom'
// import "./Header.css"
import {useBookmark} from "../context/BookmarkContext";
import styled from "styled-components";

const HeaderContainer=styled.div`
    height:60px;
    background-color: #88BFB0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
`;

const MainLogo=styled(Link)`
    text-decoration: none;
    color: inherit;
    color: #BF0426;
    display: inline-block;
    margin: 0;
    font-size: 34px;
    font-weight:bold;
    padding-left: 3%;
`;

const BtnDiv=styled.div`
    display: flex;
    gap: 10px;
`;

const SearchBtn=styled(Link)`
    text-decoration: none;
    color: inherit;
    display: inline-block;
    margin: 0;
    font-size: 24px;
`;

const WishlistBtn=styled(Link)`
    text-decoration: none;
    color: inherit;
    display: inline-block;
    margin: 0;
    font-size: 24px;
`;

function Header() {
  const {bookmarks}=useBookmark();
  return (
    <HeaderContainer>
        <MainLogo to={`/`} className='main-page'>Movie Searcher</MainLogo>
        <BtnDiv>
          <SearchBtn to={`/search`} className='movie-search'>🔍</SearchBtn>
          <WishlistBtn to={`/watchlist`} className='bookmarked-movie'>❤️({bookmarks.length})</WishlistBtn>
        </BtnDiv>
    </HeaderContainer>
  )
}

export default Header