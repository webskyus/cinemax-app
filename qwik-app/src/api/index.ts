const API_KEY = '59604b9bbff1fba514480c0d82b6ca71';
const API_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTYwNGI5YmJmZjFmYmE1MTQ0ODBjMGQ4MmI2Y2E3MSIsInN1YiI6IjVmYjQ5ZjJjYWZhMWIwMDA0MGJiOGJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.baeLdvPfm6F4P-Yiw3FY0Ifp9lA7ijo3ZwSjYcqbS80';
const API_ROOT_URL = 'https://api.themoviedb.org';
const API_V = '3';
const API_URL = `${API_ROOT_URL}/${API_V}/${API_KEY}`;
const OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`
    }
};
