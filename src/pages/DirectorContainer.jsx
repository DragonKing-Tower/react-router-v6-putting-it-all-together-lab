import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Outlet, Link } from "react-router-dom";
import DirectorForm from "./DirectorForm";
import DirectorCard from "./DirectorCard";

const DirectorContainer = () => {
	const [directors, setDirectors] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/directors")
			.then((r) => {
				if (!r.ok) {
					throw new Error("failed to fetch directors");
				}
				return r.json();
			})
			.then(setDirectors)
			.catch(console.log);
	}, []);

	return (
		<>
			<NavBar />
			<main>
				<h1>Welcome to the Director's Directory!</h1>
				{/* all director components should render here depending on route */}
				<Outlet context={{directors:directors, setDirectors:setDirectors}}></Outlet>
				<Link to="/directors/new">Create New Director</Link>
			</main>
		</>
	);
};

export default DirectorContainer;
