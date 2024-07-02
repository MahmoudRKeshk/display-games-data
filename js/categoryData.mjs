export async function getData (categoryName){
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=${categoryName}&sort-by=release-date`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '4b8fc32fd9msh140f47f5c643ce6p179385jsn88d7b8a832c1',
			'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.text();
		return result;

	} catch (error) {
		console.error(error);
	}
}