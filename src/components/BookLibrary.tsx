import React, { useState, useEffect } from 'react';

// FELADAT 1: Hozd létre a Book típust a következő mezőkkel:
// - id: number
// - title: string
// - author: string
// - genre: string
// - year: number
// - rating: number
// - coverImage: string
// - isFavorite: boolean
// A kódod ide írd:


const BookLibrary: React.FC = () => {
    // FELADAT 2: Hozz létre state-eket a következőkhöz:
    // - books: a könyvek listája (kezdetben üres tömb)
    // - selectedBookId: a kiválasztott könyv azonosítója (kezdetben null)
    // - filteredGenre: a szűréshez használt műfaj (kezdetben 'all')
    // - currentPage: az aktuális oldal (kezdetben 1)
    // - booksPerPage: könyvek száma oldalanként (kezdetben 4)
    // A kódod ide írd:


    // FELADAT 3: Készítsd el a fetch függvényt, ami betölti a könyveket a books.json fájlból
    // - Használj useEffect hook-ot
    // - A függvény csak egyszer fusson le a komponens betöltésekor
    // - Kezeld le a hibákat is try-catch vagy .catch() segítségével
    // A kódod ide írd:


    // FELADAT 4: Készíts egy toggleFavorite függvényt
    // - Paraméterként kapja meg a könyv ID-t
    // - A függvény változtassa meg a könyv isFavorite tulajdonságát az ellenkezőjére
    // - Használd a spread operátort (...) és a map függvényt a state frissítéséhez
    // A kódod ide írd:


    // Könyv kiválasztása
    const selectBook = (id: number) => {
        setSelectedBookId(id === selectedBookId ? null : id);
    };

    // Műfaj szerinti szűrés
    const filterByGenre = (genre: string) => {
        setFilteredGenre(genre);
        setCurrentPage(1); // Visszaállítjuk az első oldalra szűréskor
    };

    // A megjelenített könyvek szűrése műfaj szerint
    const filteredBooks = filteredGenre === 'all'
        ? books
        : books.filter(book => book.genre === filteredGenre);

    // Oldalszámozás számítása
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    // Lapozás funkciók
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Kiválasztott könyv meghatározása
    const selectedBook = books.find(book => book.id === selectedBookId);

    return (
        <div className="book-library">
            <h1>Könyvtáram</h1>
            
            {/* Műfaj szűrő */}
            <div className="filter-section">
                <h3>Műfajok</h3>
                <div className="filter-buttons">
                    <button 
                        className={filteredGenre === 'all' ? 'active' : ''}
                        onClick={() => filterByGenre('all')}
                    >
                        Összes
                    </button>
                    <button 
                        className={filteredGenre === 'regény' ? 'active' : ''}
                        onClick={() => filterByGenre('regény')}
                    >
                        Regény
                    </button>
                    <button 
                        className={filteredGenre === 'sci-fi' ? 'active' : ''}
                        onClick={() => filterByGenre('sci-fi')}
                    >
                        Sci-Fi
                    </button>
                    <button 
                        className={filteredGenre === 'fantasy' ? 'active' : ''}
                        onClick={() => filterByGenre('fantasy')}
                    >
                        Fantasy
                    </button>
                </div>
            </div>

            {/* Könyvek listája és részletek */}
            <div className="content-container">
                <div className="books-container">
                    <h2>Könyvek</h2>
                    
                    {/* FELADAT 5: Készítsd el a könyvek listáját mapping segítségével
                        - Használd a currentBooks változót a map függvényhez
                        - Minden könyv egy kártyában jelenjen meg, benne:
                            * Cím
                            * Szerző
                            * Értékelés (pl. "Rating: 4.5/5")
                            * Egy gomb a kedvencekhez adáshoz (toggleFavorite hívással)
                            * A kedvenc könyvek kártyája legyen kiemelve
                        - A kártyára kattintva hívja meg a selectBook függvényt
                        - A kiválasztott könyv kártyája legyen kiemelve más színnel
                        A kódod ide írd: */}

                    
                    {/* Lapozó */}
                    <div className="pagination">
                        <button onClick={prevPage} disabled={currentPage === 1}>Előző</button>
                        <span>{currentPage} / {totalPages}</span>
                        <button onClick={nextPage} disabled={currentPage === totalPages}>Következő</button>
                    </div>
                </div>

                {/* Könyv részletek panel */}
                <div className="book-details">
                    <h2>Könyv részletei</h2>
                    {selectedBook ? (
                        <div className="detail-card">
                            <h3>{selectedBook.title}</h3>
                            <p><strong>Szerző:</strong> {selectedBook.author}</p>
                            <p><strong>Műfaj:</strong> {selectedBook.genre}</p>
                            <p><strong>Kiadás éve:</strong> {selectedBook.year}</p>
                            <p><strong>Értékelés:</strong> {selectedBook.rating}/5</p>
                            <button 
                                className={`favorite-btn ${selectedBook.isFavorite ? 'favorite' : ''}`}
                                onClick={() => toggleFavorite(selectedBook.id)}
                            >
                                {selectedBook.isFavorite ? 'Eltávolítás a kedvencekből' : 'Hozzáadás a kedvencekhez'}
                            </button>
                        </div>
                    ) : (
                        <p>Válassz ki egy könyvet a részletek megtekintéséhez</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookLibrary;