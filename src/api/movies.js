import instance from "./axios";

export const getPopularMovie= async()=>{
            const response = await instance.get('/movie/popular');
            return response.data;
};

export const getMovieDetails = async(movieId)=>{
    const response=await instance.get(`/movie/${movieId}`);
    return response.data;
};

export const searchMovies= async(query)=>{
    const response= await instance.get(`/search/movie?query=${query}`);
    return response.data;
}