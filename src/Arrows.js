const Arrows = (props) => {
	return (
		<div id='arrows'>
			<div id='arrow-top' onClick={() => props.up()}>
				<i class='far fa-arrow-alt-circle-up fa-3x'></i>
			</div>
			<div id='arrow-right' onClick={() => props.right()}>
				<i class='far fa-arrow-alt-circle-right fa-3x'></i>
			</div>
			<div id='arrow-bottom' onClick={() => props.down()}>
				<i class='far fa-arrow-alt-circle-down fa-3x'></i>
			</div>
			<div id='arrow-left' onClick={() => props.left()}>
				<i class='far fa-arrow-alt-circle-left fa-3x'></i>
			</div>
		</div>
	);
};

export default Arrows;
