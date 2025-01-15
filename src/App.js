import logo from './logo.svg'; // декларативный стиль
import './App.css'; // декларативный стиль

const getDate = () => {
	// декларативный стиль
	const today = new Date();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();
	const date = today.getDate();
	return `${date}/${month}/${year}`;
}

export const App = () => {
	const currentDate = getDate();

	return (
		// декларативный стиль
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<h2>{currentDate}</h2>
			</header>
		</div>
	);
};


