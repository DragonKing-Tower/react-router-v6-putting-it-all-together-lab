import { useOutletContext, Link } from "react-router-dom";

const DirectorList = () => {
	const {directors} = useOutletContext();
	//added List here to allow navigation
	const displayDirectors = directors.map((d) => (
		<li key={d.id}>
			<Link to={d.id}>{d.name}</Link>
		</li>
	));

	return <ul>{displayDirectors}</ul>;
};

export default DirectorList;
