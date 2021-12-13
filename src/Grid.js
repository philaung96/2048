const Grid = (props) => {
	let tilesJsx = [];

	if (props.tiles)
		tilesJsx = props.tiles.map((tile, index) => (
			<div className='tile' key={index}>
				<h2>{tile ? tile : ''}</h2>
			</div>
		));
	return (
		<>
			<h3 id='best'>BEST : {props.best}</h3>
			<h3 id='score'>SCORE : {props.score}</h3>
			<div id='grid'>{tilesJsx && tilesJsx}</div>
		</>
	);
};

export default Grid;
