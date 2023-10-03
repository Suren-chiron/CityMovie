export const getIDPapularMovies = async () => {
    const url = 'https://online-movie-database.p.rapidapi.com/title/get-most-popular-movies';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '935d6ef672mshb73110657b46841p1ac8c0jsn74f1d11f6984',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    const result = await response.json();
    if (result.message !== undefined || result === undefined) {
        return null;
    }
    const generateresult = result.slice(0, 5).map(p => p.slice(7, -1))
    return generateresult
}


export const getPapularMovies = async () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '935d6ef672mshb73110657b46841p1ac8c0jsn74f1d11f6984',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };

    const getidmovies = await getIDPapularMovies()

    if (getidmovies === null) {
        return getidmovies
    }

    const requests = getidmovies.map(async id => {
        const res = await fetch(`https://online-movie-database.p.rapidapi.com/title/get-details?tconst=${id}`, options);
        return res.json();
    });
    return await Promise.all(requests);
}