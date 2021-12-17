import './App.css';
import TopTen from './TopTen';
import Instruction from './Instruction';
import Game from './Game';
import { useState, useEffect } from 'react';

function App() {
	const apiURL = 'https://clone48.herokuapp.com';
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		// fetch scores from database
		fetch(apiURL)
			.then((res) => res.json()) //turn data into json
			.then((data) => {
				const result = data.users;
				// sort the data by score from largest to smallest
				result.sort((a, b) => b.score - a.score);
				setLeaderboard(result);
			});
	}, []);

	return (
		<div id='App'>
			<h1>2048</h1>
			<main>
				<Game leaders={leaderboard} />
				<TopTen leaders={leaderboard} />
				<Instruction />
			</main>
		</div>
	);
}

export default App;
