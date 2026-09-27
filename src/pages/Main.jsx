import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import "../api/axios";
import { getPopularMovie } from "../api/movies";
import { useBookmark } from "../context/BookmarkContext";

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
    <div>
      <h2><strong>인기 top20 영화</strong></h2>
      <div className="movie-grid">
        {movieList?.map((movie)=>{
           const posterUrl= movie.poster_path? 
            `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
            "https://placehold.co/500x750?text=No+Image"; 
            const bookmarked = isBookmarked(movie.id);

          return(<Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <button className="bookmark-btn" 
            onClick={(e)=>{
              e.preventDefault();
              toggleBookmark(movie);
            }}>{bookmarked? "❤️" : "🤍"}
            </button>
            <img src={posterUrl} alt={movie.title} className="movie-poster"></img>
            <h4>제목: {movie.title}</h4>
            <p>개봉 연도:{movie.release_date}</p>
            <p>평점:{movie.vote_average} </p>
          </Link>);
      })}
    </div>
    </div>
  );
}

export default Main;