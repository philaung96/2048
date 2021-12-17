const TopTen = (props) => {
	let leadersJsx = [];
	const topTen = [...props.leaders];

	// If leaderboard has more than 10 users, chop the
	// array to 10
	if (topTen.length > 10) topTen.splice(10, props.leaders.length - 10);

	// Map through the top 10 users and creat a list
	// element to display on site
	leadersJsx = topTen.map((user, index) => (
		<li className='user-info' key={index}>
			<p>
				{index + 1} - {user.name} : {user.score}
			</p>
		</li>
	));

	return (
		<section id='leaderboard'>
			<h2>TOP 10</h2>
			<ul id='top-ten'>{leadersJsx}</ul>
		</section>
	);
};

export default TopTen;
