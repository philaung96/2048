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
			<div>Score : {props.score}</div>
			<div id='grid'>{tilesJsx && tilesJsx}</div>
		</>
	);
};

export default Grid;
