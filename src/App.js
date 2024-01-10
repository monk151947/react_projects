import './App.css';
import SearchIcon from "./search.svg";
import { useState, useEffect } from 'react'
import MovieCard from "./components/MovieCard";

const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10'
const MOVIE_URL = "http://www.omdbapi.com?apikey=your_api_key";

function App() {
  const [resp, setResp] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(
    () => {
      fetch(API_URL)
        .then(res => res.json()
        ).then(data => setResp(data))
        .then(err => err)
    }, [])

  const searchMovies = async (title) => {
    const response = await fetch(`${MOVIE_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
      <div className="container">
        <div>{resp ? <pre>{JSON.stringify(resp, null, 2)}</pre> : 'Loading...'}
        </div>
        <>
          <ul>
            {(resp).map(d => (<li key={d.id}>{d.id} : {d.userId} :{d.title}</li>))}
          </ul>
        </>
      </div>
    </div>
  );
}

export default App;
