import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingBox from "../components/Loading";

function Detail() {
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getMovie();
    console.log(movie);
  }, [getMovie]);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : (
        <div>
          <Link to="/">
            <button>Go back</button>
          </Link>
          <img src={movie.medium_cover_image} alt="" />
          <h1>{movie.title_long}</h1>
          <p>{movie.description_full}</p>
          <h3>Rating: {movie.rating}/10</h3>
          <h3>Runtime:{movie.runtime} min</h3>
          <ul>
            <h3>Genres</h3>
            {movie.genres.map((g) => (
              <li>{g}</li>
            ))}
          </ul>
          <a href={movie.url}>Watch this movie-YTS.MX</a>
        </div>
      )}
    </div>
  );
}

export default Detail;
