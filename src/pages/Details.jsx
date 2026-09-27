import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Details.css"
import instance from "../api/axios";
import { getMovieDetails } from "../api/movies";
import { useBookmark } from "../context/BookmarkContext";

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
    <div className="movie-detail">
      <img className="movie-detail-poster" 
           src={posterUrl}/>
      <div className="movie-description">
        <h3>제목: {movie.title}</h3>
        <button className="bookmark-btn"
        onClick={(e)=>{
          e.preventDefault();
          toggleBookmark(movie);
        }}>{bookmarked? "❤️" : "🤍"}
        </button>
        <p>개봉일: {movie.release_date}</p>
        <p>평점: {movie.vote_average}</p>
        <p>장르: {movie.genres?.map((genre)=>(
          <span key={genre.id}>{genre.name} </span>))}</p>
        <p>줄거리: {movie.overview}</p>
      </div>
    </div>
  );
}

export default Details;