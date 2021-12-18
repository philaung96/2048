import Grid from './Grid';
import Arrows from './Arrows';
import { useState, useEffect } from 'react';
import $ from 'jquery';

const Game = (props) => {
	const [board, setBoard] = useState();
	const [gameMessage, setGameMessage] = useState([]);

	let tiles = [];
	let currentScore = 0;
	let didMoved = false;

	if (board) {
		tiles = [...board.tiles];
		currentScore = board.score;
	}

	// ********** COMPONENT RERENDER FUNCTIONS **********

	// on initial load
	useEffect(() => {
		// if there is data in local storage grab that data and update state
		if (localStorage.data) {
			const localData = JSON.parse(localStorage.getItem('data'));
			setBoard({
				tiles: [...localData.localTiles],
				best: localData.localBest,
				score: localData.localScore,
			});
		}
		// else keep current state data
		else initBoard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Initialize the Board
	const initBoard = () => {
		// create a random index from 0-15
		let random = Math.floor(Math.random() * 16);
		const tilesArr = [];
		// place 2 at the random index
		// and 0 at the rest
		for (let i = 0; i < 16; i++) {
			if (i === random) tilesArr[i] = 2;
			else tilesArr[i] = 0;
		}
		const data = JSON.parse(localStorage.getItem('data'));
		let localBest = 0;
		if (data) localBest = data.localBest;
		localStorage.setItem(
			'data',
			JSON.stringify({
				localTiles: [...tiles],
				localBest: localBest,
				localScore: currentScore,
			})
		);
		// update the state for component to rerender
		setBoard({
			tiles: tilesArr,
			best: localBest,
			score: 0,
		});
	};

	//**** WRONG ATM OFF BY ONE MOVE */
	// Check if any tile is movable to bottom or right
	// only bottom or right since the iteration is done
	// top to bottom, left to right
	// Should only be called when all tiles are populated
	// return -> boolean
	const movable = () => {
		let isMovable = false;

		// checks if the tile below is same as tile at
		// index
		// index -> index of a tile -> int
		// return -> true if two tiles are same else
		// false
		const bottomMovable = (index) => {
			// if the bottom tile exist and the bottom
			// tile has same value as tile at index,
			// return true. If not, return false
			if (index + 4 <= 15 && tiles[index] === tiles[index + 4]) return true;
			else return false;
		};

		// checks if the tile on right is same as tile at
		// index
		// index -> index of a tile -> int
		// return -> true if two tiles are same else
		// false
		const rightMovable = (index) => {
			const initialRow = Math.floor(index / 4);
			// if the tile at right is not on same row as
			// current tile or current tile and tile on
			// right are not the same, return false. If
			// not, return true
			if (
				Math.floor((index + 1) / 4) !== initialRow ||
				tiles[index] !== tiles[index + 1]
			)
				return false;
			return true;
		};

		// no need to check last index since the one
		// before last will check if they are the same
		for (let index = 0; index < 15; index++) {
			// if any tile on bottom or right is same as
			// current tile set return value true and
			// quite iterating over tiles
			if (bottomMovable(index) || rightMovable(index)) {
				isMovable = true;
				break;
			}
		}

		// return false by default
		return isMovable;
	};

	// followup after game is over
	const gameOver = () => {
		// Show the game over message
		$('#game-over').slideDown();

		// Set the game over message
		const messages = ['!!! GAME OVER !!!'];

		// Find the position of current score on
		// leaderboard
		const position = props.leaders.findIndex(
			(user) => currentScore > user.score
		);

		// If current score is within top 100
		// let the user know and display position
		if (position > -1 && position < 99) {
			messages.push(`Congratulations! you place ${position + 1} on Top 100`);

			// Hide the restart button so user can't
			// accidentally restart without add their
			// name to top 100 list
			$('#restart').slideUp();
		}
		setGameMessage(messages);
	};

	// if every tile is populated, and no
	// possibility to move any way, game over
	// checks after board is updated
	useEffect(() => {
		if (tiles.every((tile) => tile > 0) && !movable()) gameOver();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [board, props]);

	// restarts the game: reinitialize the board
	const handleRestart = () => {
		// Hide the game over message
		$('#game-over').fadeOut();
		// Initialize the board
		initBoard();
	};

	// handle when user add their name to top 100
	// after game over
	const handleGameOverSubmit = (e) => {
		e.preventDefault();
		const inputName = $('#input-name').val();

		// if the name is submitted
		if (inputName) {
			// show the restart button
			$('#restart').slideDown();
			// add the name and score to database
			fetch('https://clone48.herokuapp.com', {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					admin: process.env.REACT_APP_ADMIN_KEY,
					user: {
						name: inputName,
						score: currentScore,
					},
				}),
			});
			// restart the game
			handleRestart();
		}
		// if the input name is empty, do nothing and let
		// user know to put a name
		else {
			$('#input-name').attr('placeholder', 'please enter a name!');
			$('#input-name').addClass('red-placeholder');
		}
	};

	// Update the state for component to rerender the
	// update tiles
	const updateBoard = () => {
		// get a random value between 0-15
		let random = Math.floor(Math.random() * 16);

		// keep getting random value till there is an empty spot
		while (tiles[random] > 0) {
			random = Math.floor(Math.random() * 16);
		}

		// populate the empty spot
		tiles[random] = 2;

		// ========== LOCAL STORAGE ==========
		const localData = JSON.parse(localStorage.getItem('data'));

		// if current score is higher than one in local
		// save current as best else keep local best
		let maxScore = 0;
		currentScore > localData.localBest
			? (maxScore = currentScore)
			: (maxScore = localData.localBest);

		// store data to localStorage before changing
		// state
		localStorage.setItem(
			'data',
			JSON.stringify({
				localTiles: [...tiles],
				localBest: maxScore,
				localScore: currentScore,
			})
		);
		// ========== LOCAL STORAGE ==========

		// update the state for component to
		// rerender
		setBoard({
			tiles: tiles,
			best: maxScore,
			score: currentScore,
		});
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
		let total = tiles[to] + tiles[from];
		// if the tiles combine, update score
		if (tiles[to] === tiles[from]) currentScore += total;
		// combine two tiles into 'to' index
		tiles[to] = total;
		// empty the tile at 'from' index
		tiles[from] = 0;
		// set didMoved to true for component to rerender
		didMoved = true;
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
						// stay at current place and
						// check one more time
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
		// if the tile(s) moved
		if (didMoved) updateBoard();
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
						// stay at current place and
						// check one more time
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
		// if the tile(s) moved
		if (didMoved) updateBoard();
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
						// stay at current place and
						// check one more time
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
		// if the tile(s) moved
		if (didMoved) updateBoard();
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
						// stay at current place and
						// check one more time
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
		// if the tile(s) moved
		if (didMoved) updateBoard();
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
	$('body').off('keyup');
	$('body').on('keyup', (e) => {
		// prevent scrolling
		e.preventDefault();
		handleKeyPress(e.key);
	});

	// A message to let user know when they win or lose
	let gameMessageJsx = gameMessage.map((message, index) => (
		<h3 key={index}>{message}</h3>
	));

	// ========== END OF FUNCTIONALITY ==========

	return (
		<section id='game'>
			<div id='game-over'>
				{gameMessageJsx}
				<form onSubmit={handleGameOverSubmit}>
					<fieldset>
						<legend>Add Your Name To Leaderboard</legend>
						<input type='text' placeholder='name' id='input-name' />
						<button type='submit'>submit</button>
					</fieldset>
				</form>
			</div>
			{board && (
				<div id='scores'>
					<h4 className='score'>best : {board.best}</h4>
					<h4 className='score'>score : {board.score}</h4>
					<button id='restart' onClick={handleRestart}>
						restart
					</button>
				</div>
			)}
			{board && (
				<Grid
					tiles={board.tiles}
					latest={board.latest}
					handleKeyPress={handleKeyPress}
				/>
			)}
			{board && (
				<Arrows up={moveUp} right={moveRight} down={moveDown} left={moveLeft} />
			)}
		</section>
	);
};

export default Game;
