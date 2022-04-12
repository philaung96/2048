const Instruction = () => {
	return (
		<aside id='instruction'>
			<h2>How To Play</h2>
			<p>
				- Use <i>Arrow Keys</i>
				<span id='arrows-p'>
					, Or <i>Arrow Buttons</i>
				</span>{' '}
				To Move The Tiles.
				<br />
				- Tiles With The Same Number Will Combine Into One.
				<br />
				- Check Out The Git Hub Repo
				<br />
				<a
					href='https://github.com/philaung96/2048'
					target='_blank'
					rel='noreferrer'>
					<i>HERE</i>
				</a>
			</p>
		</aside>
	);
};

export default Instruction;
