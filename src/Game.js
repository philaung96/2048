import Grid from './Grid';
import { useState, useEffect } from 'react';
import $ from 'jquery';

const Game = () => {
	const [board, setBoard] = useState({
		tiles: [],
		count: 1,
	});

	useEffect(() => {
		resetBoard();
	}, []);

	const resetBoard = () => {
		let random = Math.floor(Math.random() * 16);
		const tilesArr = [];
		console.log('Setting Board');
		for (let i = 0; i < 16; i++) {
			if (i === random) tilesArr[i] = 2;
			else tilesArr[i] = 0;
		}
		setBoard({ tiles: tilesArr, count: 1 });
	};

	const updateBoard = (position) => {
		const updatedTiles = [...board.tiles];
		updatedTiles[position] = 2;
		setBoard({ tiles: updatedTiles, count: board.count + 1 });
	};

	const moveable = () => true;
	const moveRight = () => {
		console.log('moving right');
	};
	const moveLeft = () => {
		console.log('moving left');
	};
	const moveUp = () => {
		console.log('moving up');
	};
	const moveDown = () => {
		console.log('moving down');
	};

	const handleKeyPress = (newPos, key) => {
		updateBoard(newPos);
		switch (key) {
			case 'ArrowLeft':
				if (moveable) moveLeft();
				break;
			case 'ArrowUp':
				if (moveable) moveUp();
				break;
			case 'ArrowRight':
				if (moveable) moveRight();
				break;
			case 'ArrowDown':
				if (moveable) moveDown();
				break;
			default:
				break;
		}
	};

	let newPos = Math.floor(Math.random() * 16);
	$('html').off('keyup');
	$('html').on('keyup', (e) => {
		while (board.tiles[newPos] > 0) {
			newPos = Math.floor(Math.random() * 16);
		}
		handleKeyPress(newPos, e.key);
	});

	if (board.count === 16) resetBoard();

	return (
		<div id='game'>
			<Grid tiles={board.tiles} handleKeyPress={handleKeyPress} />
		</div>
	);
};

export default Game;
