import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../api/movies";
import { useBookmark } from "../context/BookmarkContext";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

const MovieSearchDiv=styled.div`
    background-color: #C2F2E5;
    height:auto;
    min-height:100vh;
    padding: 20px;
`;
const SearchResultDiv=styled.div`
    text-decoration: none;
    color: inherit;
    position: relative;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 15px;
    padding-top:10px;
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
const MovieSearchPoster=styled.img`
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
const MovieSearchCard=styled(Link)`
    text-decoration: none;
    color: inherit;
    position: relative;
    min-width: 0;
`;
const MovieInput=styled.input`
    font-size: 28px;
    border-style: double;
    border-color: #BF0426;
    background-color: #bf042630;
    margin:3px;
`;
const SearchBtn=styled.button`
    font-size: 25px;
    border-style: double;
    border-color: #BF0426;
    background-color: #bf042675;
`;
const SearchForm=styled.form`
    padding-bottom: 20px;
`;
const SearchP=styled.p`
    font-size:25px;
    font-weight:bold;
    padding-bottom: 10px;
`;

function Search() {

  const [searchTerm, setSearchTerm]=useState('');
  const {isBookmarked, toggleBookmark}=useBookmark();

  const {data, isLoading, isError, error}=useQuery({
    queryKey: [ "search", "movie", searchTerm],
    queryFn: ()=>searchMovies(searchTerm),
  });

  const movies=data?.results;

  const handleChange=(e)=>{
    setSearchTerm(e.target.value);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!searchTerm.trim()) return;
    searchMovie();
  };

  return (
    <MovieSearchDiv>
      <SearchForm onSubmit={handleSubmit}>
        <SearchP>영화를 탐색하세요!</SearchP>
        <MovieInput onChange={handleChange} value={searchTerm} type="text"/>
        <SearchBtn type="submit">🔍</SearchBtn>
      </SearchForm>
      {isLoading && <div>영화 검색중..</div>}
      {isError && <div>{error.message}</div>}
      {!isLoading && !isError && movies && movies.length===0 && <div>검색 결과가 없어요</div>}
      <SearchResultDiv>
        {movies?.map((movie)=>{
                   const posterUrl= movie.poster_path? 
                    `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
                    "https://placehold.co/500x750?text=No+Image"; 
                   const bookmarked=isBookmarked(movie.id);
                  return(<MovieSearchCard to={`/movie/${movie.id}`} key={movie.id}>
                     <HeartBtn 
                      onClick={(e)=>{
                        e.preventDefault();
                        toggleBookmark(movie);
                      }}>{bookmarked? "❤️" : "🤍"}
                    </HeartBtn>
                    <MovieSearchPoster src={posterUrl} alt={movie.title}/>
                    <h4>{movie.title}</h4>
                    <p>개봉 연도:{movie.release_date}</p>
                    <p>평점:{movie.vote_average} </p>
                  </MovieSearchCard>);
              })}
      </SearchResultDiv>
    </MovieSearchDiv>
  );
}

export default Search;