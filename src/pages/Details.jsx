import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Details.css"
import instance from "../api/axios";

function Details() {

  const {id}=useParams();
  const[movie, setMovie]=useState(null);
  const [loading, setLoading]=useState(true);
  const [error, setError]=useState(null);
  const getMovieDetail =async()=>{
        try{
            const response = await instance.get(`/movie/${id}`);
            console.log("상세정보 데이터를 주세요오옹", response.data);
            setMovie(response.data)
        }catch(err){
            console.error("에러 발생", err);
            setError(err.message)
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
  return (
    <div className="movie-detail">
      <img className="movie-detail-poster" 
           src={posterUrl}/>
      <div className="movie-description">
        <h3>제목: {movie.title}</h3>
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