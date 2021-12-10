const Arrows = (props) => {
	return (
		<div id='arrows'>
			<div id='arrow-top' onClick={() => props.up()}>
				<i className='far fa-arrow-alt-circle-up fa-3x'></i>
			</div>
			<div id='arrow-right' onClick={() => props.right()}>
				<i className='far fa-arrow-alt-circle-right fa-3x'></i>
			</div>
			<div id='arrow-bottom' onClick={() => props.down()}>
				<i className='far fa-arrow-alt-circle-down fa-3x'></i>
			</div>
			<div id='arrow-left' onClick={() => props.left()}>
				<i className='far fa-arrow-alt-circle-left fa-3x'></i>
			</div>
		</div>
	);
};

export default Arrows;
