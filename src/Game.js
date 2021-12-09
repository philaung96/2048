import Grid from './Grid';
import { useState, useEffect } from 'react';
import $ from 'jquery';

const Game = () => {
	const [board, setBoard] = useState({
		tiles: [],
		count: 1,
	});

	// start the game on load
	useEffect(() => {
		startGame();
	}, []);

	// Initialize the Board
	const startGame = () => {
		// create a random index from 0-15
		let random = Math.floor(Math.random() * 16);
		const tilesArr = [];
		console.log('Setting Board');
		// place 2 at the random index
		// and 0 at the rest
		for (let i = 0; i < 16; i++) {
			if (i === random) tilesArr[i] = 2;
			else tilesArr[i] = 0;
		}
		// update the state for component to rerender
		setBoard({ tiles: tilesArr, count: 1 });
	};

	// translate rows and cols into one dimensional index
	const oneDIndex = (row, col) => {
		return row * 4 + col;
	};

	// Combine two tiles into one by indices
	// from -> index of tile combining from -> int
	// to -> index of tile combining into -> int
	const combineTwoTiles = (tiles, from, to) => {
		// combine two tiles into 'to' index
		tiles[to] = tiles[to] + tiles[from];
		// empty the tile at 'from' index
		tiles[from] = 0;
	};

	// Update the state for component to rerender the
	// update tiles
	// tiles -> updated array of tiles -> [int]
	const updateBoard = (tiles) => {
		// get a random value between 0-15
		let random = Math.floor(Math.random() * 16);
		// keep getting random value till there is an empty spot
		while (board.tiles[random] !== 0) {
			random = Math.floor(Math.random() * 16);
		}
		// populate the empty spot
		tiles[random] = 2;
		// update the state
		setBoard({ ...board, tiles: tiles });
	};

	// Update the tile that's value is 0 if possible
	// tiles -> array of tiles -> [int]
	// index -> index of the that tile that is 0
	const updateZeroTileRight = (tiles, index) => {
		// keep track of the current row
		const currentRow = Math.floor(index / 4);
		// one index left of tile that is 0
		let left = index - 1;
		// condition to exit the loop
		let exit = false;
		while (!exit) {
			// if the tile on left of 0 is not 0
			// and index on left is on current row
			if (tiles[left] > 0 && Math.floor(left / 4) === currentRow) {
				// if the tile of left is the same as the tile on right of 0
				// and they are on the same row,
				// combine them instead
				if (
					tiles[left] === tiles[index + 1] &&
					Math.floor((index + 1) / 4) === currentRow
				)
					combineTwoTiles(tiles, left, index + 1);
				// else, move the tile on left to tile that is 0
				else combineTwoTiles(tiles, left, index);
				// then exit the loop
				exit = true;
			}
			// keep going left
			left--;
			// if there is no more left to go or
			// index is out of current row
			// exit the loop
			if (left < 0 || Math.floor(left / 4) !== currentRow) exit = true;
		}
	};

	// Move the individual tiles to right if possible
	// go through each row, then every columns of that
	// row, then move none 0 tiles to right if there is
	// a space
	const moveRight = () => {
		console.log('moving right');
		// grab a clone of current tiles
		let updatedTiles = [...board.tiles];
		// iterate through each rows
		for (let row = 0; row < 4; row++) {
			// iterate through columns from right to left
			// excluding the first column
			for (let col = 3; col >= 1; col--) {
				// one dimensional index of the tile
				let index = oneDIndex(row, col);
				// and one dimensional index of tile to
				// left
				let leftIndex = oneDIndex(row, col - 1);
				// if the tile is 0, find a tile of left
				// that is not 0 if that exists
				if (updatedTiles[index] === 0) updateZeroTileRight(updatedTiles, index);
				else {
					// if the tile has value,
					// check the tile left of it
					// if the tile on left is 0,
					// update that tile to not be 0 if possible
					if (updatedTiles[leftIndex] === 0) {
						updateZeroTileRight(updatedTiles, leftIndex);
					}
					// else if the tile on left and
					// current tile has same value
					else if (updatedTiles[index] === updatedTiles[leftIndex]) {
						// combine the two tiles into one
						combineTwoTiles(updatedTiles, leftIndex, index);
					}
					// else do nothing
				}
			}
		}
		// update the state to rerender the component
		// when done updating the tiles
		updateBoard(updatedTiles);
	};

	// Move the individual tiles to left if possible
	// go through each row, then every columns of that
	// row, then move none 0 tiles to left if there is
	// a space
	const moveLeft = () => {
		console.log('moving left');
	};

	// Move the individual tiles to up if possible
	// go through each col, then every rows that
	// contains that col , then move none 0 tiles up
	// if there is a space
	const moveUp = () => {
		console.log('moving up');
	};

	// Move the individual tiles to down if possible
	// go through each col, then every rows that
	// contains that col , then move none 0 tiles down
	// if there is a space
	const moveDown = () => {
		console.log('moving down');
	};

	// Take action accordingly after user pressed a key
	// key -> key pressed by user -> string
	const handleKeyPress = (key) => {
		switch (key) {
			// left arrow key pressed
			// move the tiles to left if possible
			case 'ArrowLeft':
				moveLeft();
				break;
			// up arrow key pressed
			// move the tiles up if possible
			case 'ArrowUp':
				moveUp();
				break;
			// right arrow key pressed
			// move the tiles to right if possible
			case 'ArrowRight':
				moveRight();
				break;
			// down arrow key pressed
			// move the tiles down if possible
			case 'ArrowDown':
				moveDown();
				break;
			// Do nothing for the rest of the key
			default:
				break;
		}
	};

	// on key press, call the handleKeyPress function 
	// with the key value as parameter
	$('html').off('keyup');
	$('html').on('keyup', (e) => handleKeyPress(e.key));

	return (
		<div id='game'>
			<Grid tiles={board.tiles} handleKeyPress={handleKeyPress} />
		</div>
	);
};

export default Game;
