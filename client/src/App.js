import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);
  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: movieReview,
    }).then(() => {
      setMovieReviewList([
        ...movieReviewList,
        {
          movieName: movieName,
          movieReview: movieReview,
        },
      ]);
    });
  };
  const [newReview, setNewReview] = useState("");
  const deleteReveiw = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movieName) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movieName,
      movieReview: newReview,
    });
    setMovieReview("");
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieReviewList(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>MOVIE REVIEW APP</h1>
      <div>
        <input
          placeholder="Enter Movie Name.."
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          onChange={(e) => {
            setMovieReview(e.target.value);
          }}
        />
      </div>
      <button onClick={submitReview}>Submit</button>
      {movieReviewList.map((val) => {
        return (
          <div className="card">
            <h1>{val.movieName}</h1>
            <p>{val.movieReview}</p>

            <button
              onClick={() => {
                deleteReveiw(val.movieName);
              }}
            >
              Delete
            </button>
            <input
              placeholder="Enter Text"
              id="updateInput"
              onChange={(e) => {
                setNewReview(e.target.value);
              }}
            />
            <button
              onClick={() => {
                updateReview(val.movieName);
              }}
            >
              Update
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
