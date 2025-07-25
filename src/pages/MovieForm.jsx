import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useOutletContext, useNavigate } from "react-router-dom";

function MovieForm() {
	const [title, setTitle] = useState("");
	const [time, setTime] = useState("");
	const [genres, setGenres] = useState("");
	const { director, setMovies } = useOutletContext();
	const navigate = useNavigate();

	if (!director) {
		return <h2>Director not found.</h2>;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const newMovie = {
			id: uuidv4(),
			title,
			time: parseInt(time),
			genres: genres
				.split(",")
				.map((genre) => genre.trim())
				.filter((genre) => genre.length > 0),
		};
		fetch(`http://localhost:4000/directors/${director.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ movies: [...director.movies, newMovie] }),
		})
			.then((r) => {
				if (!r.ok) {
					throw new Error("failed to add movie");
				}
				return r.json();
			})
			.then((data) => {
				console.log(data);
				// handle context/state changes
				setMovies((prevMov) => [...data.movies]);
				// navigate to newly created movie page
				navigate(`/directors/${director.id}/movies/${newMovie.id}`,{state:{movie:newMovie}});
			})
			.catch(console.log);
	};

	return (
		<div>
			<h2>Add New Movie</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Movie Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<input
					type="number"
					placeholder="Duration (minutes)"
					value={time}
					onChange={(e) => setTime(e.target.value)}
					required
				/>
				<input
					type="text"
					placeholder="Genres (comma-separated)"
					value={genres}
					onChange={(e) => setGenres(e.target.value)}
					required
				/>
				<button type="submit">Add Movie</button>
			</form>
		</div>
	);
}

export default MovieForm;
