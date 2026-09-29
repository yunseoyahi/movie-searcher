import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getMovieDetails } from "../api/movies";
import { useBookmark } from "../context/BookmarkContext";
import styled from "styled-components";

const MovieDetailDiv=styled.div`
    background-color: #C2F2E5;
    height:100vh;
    display: flex;
    flex-direction: row;
    align-items: flex-start; 
    gap: 30px;               
    margin: 0 auto;
    padding: 20px;
`;
const MovieDetaiPoster=styled.img`
    width: 300px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
`;
const MovieDescription=styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 12px;
    position: relative;
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

function Details() {

  const {id}=useParams();
  const[movie, setMovie]=useState(null);
  const [loading, setLoading]=useState(true);
  const [error, setError]=useState(null);
  const {isBookmarked, toggleBookmark}=useBookmark();

  const getMovieDetail =async()=>{
        try{
            const data = await getMovieDetails(id);
            setMovie(data);
        }catch(err){;
            setError(err.message);
        }finally{
          setLoading(false);
        }
    };
  useEffect(()=>{
          getMovieDetail()
      },[id])
  
  if(loading)
    return <div>로딩 중입니다...</div>;
  if(error)
    return <div>{error}</div>;
  if(!movie)
    return <div>영화 정보를 찾을 수 없습니다.</div>;

  const posterUrl= movie.poster_path? 
                    `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
                    "https://placehold.co/500x750?text=No+Image";
  const bookmarked=isBookmarked(movie.id);
  return (
    <MovieDetailDiv>
      <MovieDetaiPoster
           src={posterUrl}/>
      <MovieDescription>
        <h3>제목: {movie.title}</h3>
        <HeartBtn
        onClick={(e)=>{
          e.preventDefault();
          toggleBookmark(movie);
        }}>{bookmarked? "❤️" : "🤍"}
        </HeartBtn>
        <p>개봉일: {movie.release_date}</p>
        <p>평점: {movie.vote_average}</p>
        <p>장르: {movie.genres?.map((genre)=>(
          <span key={genre.id}>{genre.name} </span>))}</p>
        <p>줄거리: {movie.overview}</p>
      </MovieDescription>
    </MovieDetailDiv>
  );
}

export default Details;