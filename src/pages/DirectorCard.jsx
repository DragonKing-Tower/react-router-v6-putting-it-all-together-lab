import { useEffect, useState } from "react";
import { useOutletContext, useParams, Link, Outlet } from "react-router-dom";

function DirectorCard() {
	const {directors} = useOutletContext();
	const { id } = useParams();
	const director = directors.find((director) => director.id === id);
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		if (director) {
			setMovies(director.movies);
		}
	}, [director]);

	if (!director) {
		return <h2>Director not found.</h2>;
	}

	return (
		<div>
			<h2>{director.name}</h2>
			<p>{director.bio}</p>
			<h3>Movies:</h3>
			<ul>
				{movies.map((movie) => (
					<li key={movie.id}>
						<Link to={`movies/${movie.id}`}>{movie.title}</Link>
					</li>
				))}
			</ul>
			<Link to={`movies/new`}>Add New Movie</Link>
			{/* Movie compoenents should render here depending on route */}
			<Outlet context={{movies:movies,director:director,setMovies:setMovies}} />
		</div>
	);
}

export default DirectorCard;
