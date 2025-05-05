import React, { useEffect, useState } from 'react';
import '../MovieLibrary.css';

// FELADAT 1: Készítsd el a Movie típust
// A típus tartalmazzon: id, title, director, year, genre, rating, isFavorite, posterUrl mezőket
// A kódod ide írd:

type Movie = {
    id: number,
    title: string,
    director: string,
    year: number,
    genre: string,
    rating: number,
    isFavorite: boolean,
    posterUrl: string

}

const MovieLibrary = () => {
    // FELADAT 2: Készítsd el a szükséges useState hook-okat
    // - movies: tárolja a filmek listáját
    // - selectedGenre: tárolja a kiválasztott műfajt (alapértelmezett: 'all')
    // - searchTerm: tárolja a keresési kifejezést (alapértelmezett: '')
    // - currentPage: tárolja az aktuális oldalszámot (alapértelmezett: 1)
    // - isLoading: tárolja, hogy éppen töltődnek-e az adatok (alapértelmezett: true)
    // A kódod ide írd:

    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true)

    // FELADAT 3: Készítsd el a useEffect hook-ot, ami betölti a filmeket
    // - A komponens betöltésekor hívjon meg egy fetchMovies függvényt
    // - A fetchMovies függvény a "movies.json" fájlból töltse be az adatokat
    // - Sikeres betöltés esetén állítsa be a movies state-et és az isLoading-ot false-ra
    // - Hibakezelés: console.error-ral jelezze a hibát
    // A kódod ide írd:

    function fetchMovies() {
        fetch("movies.json")
            .then(response => response.json())
            .then(data => {
                setMovies(data.movies)
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Hiba történt az adatok betöltésekor:", error)
            })
    }

    useEffect(() => {
        fetchMovies();
    }, [])


    // FELADAT 4: Készíts egy toggleFavorite függvényt
    // - A függvény paraméterként kapja meg a film azonosítóját (id)
    // - A függvény állítsa át a kiválasztott film isFavorite értékét az ellenkezőjére
    // - Használd a spread operátort (...) az új film objektum és az új filmek tömb létrehozásához
    // A kódod ide írd:

    function toggleFavorite(filmAzonosito: number) {
        const updatedMovies = movies.map(movie =>
            movie.id === filmAzonosito
                ? { ...movie, isFavorite: !movie.isFavorite }
                : movie
        );
        setMovies(updatedMovies);
    }


    // FELADAT 5: Készítsd el a szűrő logikát
    // - filteredMovies: a movies tömböt szűrje a selectedGenre és searchTerm alapján
    // - Ha a selectedGenre 'all', ne szűrjön műfaj szerint
    // - A searchTerm-et használja a film címében való kereséshez (case insensitive)
    // A kódod ide írd:

    const filteredMovies = movies.filter(movie => {
        const matchesGenre = selectedGenre === 'all' || movie.genre.toLowerCase() === selectedGenre.toLowerCase();
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesGenre && matchesSearch;
    });

    // Lapozás logika
    const moviesPerPage = 4;
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    // Lapozás kezelése
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Műfaj szűrő kezelése
    const handleGenreChange = (genre: string) => {
        setSelectedGenre(genre);
        setCurrentPage(1); // Visszaállítjuk az első oldalra
    };

    // Keresés kezelése
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Visszaállítjuk az első oldalra
    };

    return (
        <div className="movie-library">
            <h1>Film Könyvtár</h1>

            {/* Keresés és szűrés */}
            <div className="controls">
                <input
                    type="text"
                    placeholder="Keresés film címe szerint..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />

                <div className="genre-filters">
                    <button
                        className={selectedGenre === 'all' ? 'active' : ''}
                        onClick={() => handleGenreChange('all')}
                    >
                        Összes
                    </button>
                    <button
                        className={selectedGenre === 'action' ? 'active' : ''}
                        onClick={() => handleGenreChange('action')}
                    >
                        Akció
                    </button>
                    <button
                        className={selectedGenre === 'comedy' ? 'active' : ''}
                        onClick={() => handleGenreChange('comedy')}
                    >
                        Vígjáték
                    </button>
                    <button
                        className={selectedGenre === 'drama' ? 'active' : ''}
                        onClick={() => handleGenreChange('drama')}
                    >
                        Dráma
                    </button>
                    <button
                        className={selectedGenre === 'sci-fi' ? 'active' : ''}
                        onClick={() => handleGenreChange('sci-fi')}
                    >
                        Sci-Fi
                    </button>
                </div>
            </div>

            {/* Töltés jelző */}
            {isLoading ? (
                <div className="loading">Filmek betöltése...</div>
            ) : (
                <>
                    {/* Film lista */}
                    <div className="movie-grid">
                        {/* FELADAT 6: Készítsd el a filmek listáját mapping segítségével
                           - Használd a currentMovies tömböt
                           - Minden film egy kártyában jelenjen meg, benne:
                             * Film címe
                             * Rendező
                             * Év
                             * Értékelés
                             * Egy gomb, amivel kedvencnek jelölhető/törölhető a film (toggleFavorite)
                           - A kedvenc filmeket valahogy emeld ki (pl. más háttérszín)
                        */}
                        {/* A kódod ide írd: */}
                        {currentMovies.map(movie => (
                            <div key={movie.id} className={`movie-card${movie.isFavorite ?  'favorite' : ''}`}>
                                <h3>{movie.title}</h3>
                                <p><strong>Rendező:</strong> {movie.director}</p>
                                <p><strong>Év:</strong> {movie.year}</p>
                                <p><strong>Műfaj:</strong> {movie.genre}</p>
                                <p><strong>Értékelés:</strong> {movie.rating}/10</p>
                                <button onClick={() => toggleFavorite(movie.id)}>
                                    {movie.isFavorite ? 'Eltávolítás kedvencekből' : 'Kedvencnek jelölés'}
                                </button>
                            </div>
                        ))}

                    </div>

                    {/* Lapozó */}
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={currentPage === index + 1 ? 'active' : ''}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MovieLibrary;