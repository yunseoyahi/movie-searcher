import { useBookmark } from "../context/BookmarkContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WatchlistContainerDiv=styled.div`
    background-color: #C2F2E5;
    height:auto;
    min-height:100vh;
    padding: 20px;
`;
const BookmarkedListDiv=styled.div`
    text-decoration: none;
    color: inherit;
    position: relative;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 15px;
    padding-top:10px;
`;
const WatchlistMovieCard=styled(Link)`
    text-decoration: none;
    color: inherit;
    position: relative;
    min-width: 0;
`;
const HeartBtn=styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    padding: 5px 8px;
    z-index: 10;
`;
const WatchlistMoviePoster=styled.img`
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    display: block;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(166, 3, 3, 0.8);
`;
const WatchlistP=styled.p`
    font-size:25px;
    font-weight:bold;
    padding-bottom: 10px;
`;

function Watchlist() {
  const {bookmarks, toggleBookmark}=useBookmark();

  return (
    <WatchlistContainerDiv>
      <WatchlistP>내가 찜한 영화 목록 ({bookmarks.length})</WatchlistP>
      {bookmarks.length===0? (
        <p>아직 찜한 영화가 없습니다.</p>):
        (
          <BookmarkedListDiv>
            {bookmarks.map((movie)=>{
              const posterUrl= movie.poster_path? 
                    `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
                    "https://placehold.co/500x750?text=No+Image"; 
                  return(<WatchlistMovieCard to={`/movie/${movie.id}`} key={movie.id}>
                     <HeartBtn 
                      onClick={(e)=>{
                        e.preventDefault();
                        toggleBookmark(movie);
                      }}>❤️</HeartBtn>
                    <WatchlistMoviePoster src={posterUrl} alt={movie.title}/>
                    <h4>제목: {movie.title}</h4>
                    <p>개봉 연도:{movie.release_date}</p>
                    <p>평점:{movie.vote_average} </p>
                  </WatchlistMovieCard>);
            })};
          </BookmarkedListDiv>
        )
        }
    </WatchlistContainerDiv>
  );
}

export default Watchlist;