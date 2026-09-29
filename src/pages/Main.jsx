import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../api/axios";
import { getPopularMovie } from "../api/movies";
import { useBookmark } from "../context/BookmarkContext";
import styled from "styled-components";

const MainDiv=styled.div`
    background-color: #C2F2E5;
    width: 100%;
    padding:20px;
    box-sizing: border-box;
    min-height: 100vh;
`;
const PopularMovie=styled.p`
    display:flex;
    padding-left:20px;
    font-size:18px;
    font-weight:bold;
    color: #A60303;
`;
const MovieDiv=styled.div`
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 15px;
    padding-top:10px;
`;
const MovieCard=styled(Link)`
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
const MovieImg=styled.img`
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
  }
`;

function Main() {
  const [loading, setLoading]=useState(true);
  const [error, setError]=useState(null);
  const[movieList, setmovieList]=useState([]);
  const {toggleBookmark, isBookmarked}=useBookmark();
  
  const getMovie =async()=>{
        try{
            const data = await getPopularMovie();
            setmovieList(data.results);
        }catch(err){
            setError(err.message);
        }finally{
          setLoading(false);
        }
    };

  useEffect(()=>{
        getMovie()
    },[])
  
  if(loading) return <div>로딩 중입니다..</div>
  if(error) return <div>{error}</div>
  

  return (
    <MainDiv>
      <PopularMovie>인기 top20 영화</PopularMovie>
      <MovieDiv>
        {movieList?.map((movie)=>{
           const posterUrl= movie.poster_path? 
            `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
            "https://placehold.co/500x750?text=No+Image"; 
            const bookmarked = isBookmarked(movie.id);

          return(<MovieCard to={`/movie/${movie.id}`} key={movie.id}>
            <HeartBtn 
            onClick={(e)=>{
              e.preventDefault();
              toggleBookmark(movie);
            }}>{bookmarked? "❤️" : "🤍"}
            </HeartBtn>
            <MovieImg src={posterUrl} alt={movie.title}/>
            <h4>{movie.title}</h4>
            <p>개봉 연도:{movie.release_date}</p>
            <p>평점:{movie.vote_average} </p>
          </MovieCard>);
      })}
    </MovieDiv>
    </MainDiv>
  );
}

export default Main;