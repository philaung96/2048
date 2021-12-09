import Grid from './Grid';
import { useState, useEffect } from 'react';
import $ from 'jquery';

const Game = () => {
	const [board, setBoard] = useState({
		tiles: [],
		count: 1,
	});
	const tiles = [...board.tiles];
	console.log('board ', tiles);

	// ********** COMPONENT RERENDER FUNCTION **********

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

	// Update the state for component to rerender the
	// update tiles
	const updateBoard = () => {
		// get a random value between 0-15
		let random = Math.floor(Math.random() * 16);
		// keep getting random value till there is an empty spot
		while (board.tiles[random] > 0) {
			random = Math.floor(Math.random() * 16);
		}
		// populate the empty spot
		tiles[random] = 2;
		// if every tile is populated, game over
		if (tiles.every((tile) => tile > 0)) startGame();
		// else, update the state for component to
		// rerender
		else setBoard({ ...board, tiles: tiles });
	};

	// ********** HELPER FUNCTIONS **********

	// translate rows and cols into one dimensional index
	const oneDIndex = (row, col) => {
		return row * 4 + col;
	};

	// Combine two tiles into one by indices
	// from -> index of tile combining from -> int
	// to -> index of tile combining into -> int
	const combineTwoTiles = (from, to) => {
		console.log('moving ', from, ' to ', to);
		// combine two tiles into 'to' index
		tiles[to] = tiles[to] + tiles[from];
		// empty the tile at 'from' index
		tiles[from] = 0;
	};

	// ********** MOVEMENTS **********

	// ========== MOVING TILES TO RIGHT ==========

	// Find the index of a tile that isn't zero on left
	// of given index
	// index -> index of a tile -> int
	// return -> index of a tile if found else -1
	const findNumOnLeft = (index) => {
		// keep track of the current row
		const currentRow = Math.floor(index / 4);
		// one index left of given index
		let left = index - 1;
		// condition to exit the loop
		let exit = false;
		while (!exit) {
			// if the tile on left is not 0, return that
			// index
			if (tiles[left] > 0) return left;
			// keep going left
			left--;
			// if there is no more tile on left to go or
			// index is out of current row, exit the loop
			if (left < 0 || Math.floor(left / 4) !== currentRow) exit = true;
		}
		return -1;
	};

	// Move the individual tiles to right if possible
	// go through each row, then every columns of that
	// row, then move none 0 tiles to right if there is
	// a space
	const moveRight = () => {
		console.log('moving right');
		// iterate through each rows
		for (let row = 0; row < 4; row++) {
			// iterate through columns from right to left
			// excluding the first column
			for (let col = 3; col >= 1; col--) {
				// one dimensional index of the tile
				let currentIndex = oneDIndex(row, col);
				// find a non empty tile on left of
				// current
				let indexOnLeft = findNumOnLeft(currentIndex);
				// found
				if (indexOnLeft !== -1) {
					// check if current tile is zero
					// if zero, move tile found on left
					// into current
					if (tiles[currentIndex] === 0) {
						combineTwoTiles(indexOnLeft, currentIndex);
						col++;
					}
					// is not zero
					else {
						// if tile found on left is same
						// as current, combine tile on
						// left into current
						if (tiles[currentIndex] === tiles[indexOnLeft])
							combineTwoTiles(indexOnLeft, currentIndex);
						// if tile found on left and
						// current are not same, and
						// tile on left is not one
						// position left of current,
						// move tile on left into one
						// tile left of current
						else if (currentIndex - 1 !== indexOnLeft)
							combineTwoTiles(indexOnLeft, currentIndex - 1);
						// else do nothing
					}
				}
				// if not found do nothing
			}
		}
		// update the state to rerender the component
		// when done updating the tiles
		updateBoard();
	};

	// ========== MOVING TILES TO LEFT ==========

	// Find the index of a tile that isn't zero on right
	// of given index
	// index -> index of a tile -> int
	// return -> index of a tile if found else -1
	const findNumOnRight = (index) => {
		// keep track of the current row
		const currentRow = Math.floor(index / 4);
		// one index right of given index
		let right = index + 1;
		// condition to exit the loop
		let exit = false;
		while (!exit) {
			// if the tile on right is not 0, return
			// that index
			if (tiles[right] > 0) return right;
			// keep going right
			right++;
			// if there is no more tile on left to go or
			// index is out of current row, exit the loop
			if (right > 15 || Math.floor(right / 4) !== currentRow) exit = true;
		}
		return -1;
	};

	// Move the individual tiles to left if possible
	// go through each row, then every columns of that
	// row, then move none 0 tiles to left if there is
	// a space
	const moveLeft = () => {
		console.log('moving left');
		// iterate through each rows
		for (let row = 0; row < 4; row++) {
			// iterate through columns from left to right
			// excluding the last column
			for (let col = 0; col < 3; col++) {
				// one dimensional index of the tile
				let currentIndex = oneDIndex(row, col);
				// find a non empty tile on right of
				// current
				let indexOnRight = findNumOnRight(currentIndex);
				// found
				if (indexOnRight !== -1) {
					// check if current tile is zero
					// if zero, move tile found on right
					// into current
					if (tiles[currentIndex] === 0) {
						combineTwoTiles(indexOnRight, currentIndex);
						col--;
					}
					// is not zero
					else {
						// if tile found on right is same
						// as current, combine tile on
						// right into current
						if (tiles[currentIndex] === tiles[indexOnRight])
							combineTwoTiles(indexOnRight, currentIndex);
						// if tile found on right and
						// current are not same, and
						// tile on right is not one
						// position right of current,
						// move tile on right into one
						// tile right of current
						else if (currentIndex + 1 !== indexOnRight)
							combineTwoTiles(indexOnRight, currentIndex + 1);
						// else do nothing
					}
				}
				// if not found do nothing
			}
		}
		// update the state to rerender the component
		// when done updating the tiles
		updateBoard();
	};

	// ========== MOVING TILES UP ==========

	// Find the index of a tile that isn't zero on bottom
	// of given index
	// index -> index of a tile -> int
	// return -> index of a tile if found else -1
	const findNumBelow = (index) => {
		// tile that is one below the index
		let below = index + 4;
		// condition to exit the loop
		let exit = false;
		while (!exit) {
			// if the tile below is not 0, return that
			// index
			if (tiles[below] > 0) return below;
			// keep going below
			below += 4;
			// if there is no more tiles below,
			// exit the loop
			if (below > 15) exit = true;
		}
		return -1;
	};

	// Move the individual tiles to up if possible
	// go through each col, then every rows that
	// contains that col , then move none 0 tiles up
	// if there is a space
	const moveUp = () => {
		console.log('moving up');
		// iterate through each columns left to right
		for (let col = 0; col < 4; col++) {
			// iterate through rows from top to bottom
			// excluding the last row
			for (let row = 0; row < 3; row++) {
				// one dimensional index of the tile
				let currentIndex = oneDIndex(row, col);
				// find a non empty tile below of current
				let indexBelow = findNumBelow(currentIndex);
				// found
				if (indexBelow !== -1) {
					// check if current tile is zero
					// if zero, move tile found below
					// into current
					if (tiles[currentIndex] === 0) {
						combineTwoTiles(indexBelow, currentIndex);
						row--;
					}
					// is not zero
					else {
						// if tile found below is same as
						// current, combine tile below
						// into current
						if (tiles[currentIndex] === tiles[indexBelow])
							combineTwoTiles(indexBelow, currentIndex);
						// if tile found below and
						// current are not same, and
						// tile below is not one row
						// below of current, move below
						// into one tile below current
						else if (currentIndex + 4 !== indexBelow)
							combineTwoTiles(indexBelow, currentIndex + 4);
						// else do nothing
					}
				}
				// if not found do nothing
			}
		}
		// update the state to rerender the component
		// when done updating the tiles
		updateBoard();
	};

	// ========== MOVING TILES DOWN ==========

	// Find the index of a tile that isn't zero on above
	// of given index
	// index -> index of a tile -> int
	// return -> index of a tile if found else -1
	const findNumAbove = (index) => {
		// tile that is one above the index
		let above = index - 4;
		// condition to exit the loop
		let exit = false;
		while (!exit) {
			// if the tile above is not 0, return that
			// index
			if (tiles[above] > 0) return above;
			// keep going above
			above -= 4;
			// if there is no more tiles above,
			// exit the loop
			if (above < 0) exit = true;
		}
		return -1;
	};

	// Move the individual tiles down if possible
	// go through each col, then every rows that
	// contains that col , then move none 0 tiles down
	// if there is a space
	const moveDown = () => {
		console.log('moving down');
		// iterate through each columns left to right
		for (let col = 0; col < 4; col++) {
			// iterate through rows from top to bottom
			// excluding the first row
			for (let row = 3; row > 0; row--) {
				// one dimensional index of the tile
				let currentIndex = oneDIndex(row, col);
				// find a non empty tile above of current
				let indexAbove = findNumAbove(currentIndex);
				// found
				if (indexAbove !== -1) {
					// check if current tile is zero
					// if zero, move tile found above
					// into current
					if (tiles[currentIndex] === 0) {
						combineTwoTiles(indexAbove, currentIndex);
						row++;
					}
					// is not zero
					else {
						// if tile found above is same as
						// current, combine tile above
						// into current
						if (tiles[currentIndex] === tiles[indexAbove])
							combineTwoTiles(indexAbove, currentIndex);
						// if tile found above and
						// current are not same, and
						// tile above is not one row
						// above of current, move above
						// into one tile above current
						else if (currentIndex - 4 !== indexAbove)
							combineTwoTiles(indexAbove, currentIndex - 4);
						// else do nothing
					}
				}
				// if not found do nothing
			}
		}
		// update the state to rerender the component
		// when done updating the tiles
		updateBoard();
	};

	// ********** HANDLE KEY PRESS **********

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

	// ========== END OF FUNCTIONALITY ==========

	return (
		<div id='game'>
			<Grid tiles={board.tiles} handleKeyPress={handleKeyPress} />
		</div>
	);
};

export default Game;
