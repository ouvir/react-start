import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingBox from "../components/Loading";
import styles from "./Detail.module.css";

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
  }, [getMovie]);
  return (
    <div className={styles.detail}>
      {loading ? (
        <LoadingBox />
      ) : (
        <div className={styles.movie}>
          <img
            className={styles.movie__img}
            src={movie.large_cover_image}
            alt=""
          />
          <div>
            <h1 className={styles.movie__title}>{movie.title_long}</h1>
            <ul className={styles.movie__genres}>
              {movie.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <p className={styles.movie__summary}>{movie.description_full}</p>
            <h3 className={styles.movie__rating}>
              Rating: <strong>{movie.rating}</strong>/10
            </h3>
            <h3 className={styles.movie__runtime}>
              Runtime: <strong>{movie.runtime}</strong> min
            </h3>
            <a className={styles.movie__link} href={movie.url}>
              Watch this movie → YTS.MX
            </a>
            <Link to="/">
              <button className={styles.movie__button}>Go back</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
