import { useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";
import '../api/axios';
import instance from "../api/axios";

function Search() {

  const [searchTerm, setSearchTerm]=useState('');
  const [movies, setMovies]=useState(null);
  const [loading, setLoading]=useState(false);
  const [error, setError]=useState(null);
  const handleChange=(e)=>{
    setSearchTerm(e.target.value);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!searchTerm.trim()) return;
    searchMovie();
  }
  const searchMovie =async()=>{
        try{
            setLoading(true);
            const response = await instance.get(`/search/movie?query=${searchTerm}`);
            console.log("무비 서치 데이터 주세요오옹", response.data);
            setMovies(response.data.results);
        }catch(err){
            console.error("에러 발생", err);
            setError(err.message);
        }finally{
          setLoading(false);
        }
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={searchTerm} type="text"/>
        <button type="submit">검색</button>
      </form>
      {loading && <div>영화 검색중..</div>}
      {error && <div>{error}</div>}
      {!loading && !error && movies && movies.length===0 && <div>검색 결과가 없어요</div>}
      <div className="search-result">
        {movies?.map((movie)=>{
                   const posterUrl= movie.poster_path? 
                    `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
                    "https://placehold.co/500x750?text=No+Image"; 
                  return(<Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
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

export default Search;