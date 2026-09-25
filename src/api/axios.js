import axios from 'axios';

const instance=await axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    },
    params:{
        language: 'ko-KR'
    }
});

export default instance;