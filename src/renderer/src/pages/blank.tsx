import { Link } from 'react-router';

export function BlankPage() {
	return (
		<div>
			<h1>Blank page</h1>

			<p>Selecione ou cire um documento</p>
			<Link to="/document">Novo documento</Link>
		</div>
	);
}
