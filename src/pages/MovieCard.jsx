import { useOutletContext, useParams, useLocation } from "react-router-dom";

function MovieCard() {
	const { director, movies } = useOutletContext();
	const { movieId } = useParams();
	const location = useLocation();

	let movie = movies.find((movie) => movie.id === movieId);
  console.log("Movie:", movie)

	if (!movie && location.state.movie.id === movieId) {
		movie = location.state.movie;
    console.log("Movie Location:", movie)
	}

	if (!director) return <h2>Director not found.</h2>;
	if (!movie) return <h2>Movie not found.</h2>;

	return (
		<div>
			<h2>{movie.title}</h2>
			<p>⏱️ Duration: {movie.time} minutes</p>
			<p>🎬 Genres: {movie.genres.join(", ")}</p>
		</div>
	);
}

export default MovieCard;
