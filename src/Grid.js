const Grid = (props) => {
	let tilesJsx = [];

	if (props.tiles)
		tilesJsx = props.tiles.map((tile, index) => (
			<div className='tile' key={index}>
				<h4>{tile ? tile : ''}</h4>
			</div>
		));
	return <div id='grid'>{tilesJsx && tilesJsx}</div>;
};

export default Grid;
