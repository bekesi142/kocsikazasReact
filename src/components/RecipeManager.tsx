import React, { useEffect, useState } from 'react';
import '../RecipeManager.css';

// FELADAT 1: Hozd létre a Recipe típust az alábbi mezőkkel:
// - id: szám
// - title: szöveg
// - category: szöveg
// - preparationTime: szám (percben)
// - difficulty: szöveg ('könnyű', 'közepes', 'nehéz')
// - ingredients: szöveg tömb
// - favorite: logikai érték
// A típusodat ide írd:

type Recipe = {
    id: number,
    title: string,
    category: string,
    preparationTime: number,
    difficulty: ('könnyű' | 'közepes' | 'nehéz'),
    ingredients: string[],
    favorite: boolean
}


const RecipeManager = () => {
    // FELADAT 2: Hozz létre useState hook-okat az alábbi adatok tárolásához:
    // - recipes: Recipe típusú elemek tömbje, kezdetben üres tömb
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    // - selectedRecipeId: szám vagy null típus, kezdetben null
    const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
    // - filterCategory: szöveg típus, kezdetben 'all'
    const [filterCategory, setFilterCategory] = useState<string>('all');
    // - isLoading: logikai érték, kezdetben true
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // - searchTerm: szöveg típus, kezdetben üres string
    const [searchTerm, setSearchTerm] = useState<string>("");
    // A kódodat ide írd:


    // FELADAT 3: Készíts egy useEffect hook-ot, ami:
    // - A komponens betöltésekor lefut
    // - Lekéri a recipes.json fájlt fetch használatával
    // - Sikeres lekérés esetén beállítja a recipes state-et és az isLoading-ot false-ra állítja
    // - Hiba esetén kiírja a konzolra a hibát és az isLoading-ot false-ra állítja
    // A kódodat ide írd:

    useEffect(() => {
        fetch("recipes.json")
            .then(response => response.json())
            .then(data => {
                setRecipes(data.recipes);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Hiba történt az adatok betöltésekor", error);
                setIsLoading(false);
            })
    }, [])



    // FELADAT 4: Készíts függvényeket az alábbi feladatokhoz:
    // a) selectRecipe: egy recept kiválasztása az ID alapján
    // b) toggleFavorite: egy recept kedvenc státuszának átváltása
    // c) filterByCategory: kategória szűrés kezelése
    // d) handleSearch: keresés kezelése
    // A kódodat ide írd:

    function selectRecipe(valasztottId: number) {
        setSelectedRecipeId(valasztottId);
    }

    function toggleFavorite(kedvencId: number) {
        const updatedRecipes = [...recipes]; // Másolat készítése
        for (let index = 0; index < updatedRecipes.length; index++) {
            if (updatedRecipes[index].id === kedvencId) {
                updatedRecipes[index].favorite = !updatedRecipes[index].favorite;
            }

        }
        setRecipes(updatedRecipes);
    }

    function filterByCategory(valasztottKategoria: string) {
        setFilterCategory(valasztottKategoria);
    }

    function handleSearch(keresettReceptNeve: string) {
        setSearchTerm(keresettReceptNeve);
    }


    // A receptek szűrése kategória és keresés alapján
    const filteredRecipes = recipes
        .filter(recipe => filterCategory === 'all' || recipe.category === filterCategory)
        .filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="recipe-manager">
            <h1>Receptkönyv</h1>

            {/* Betöltés jelző */}
            {isLoading ? (
                <div className="loading">Receptek betöltése...</div>
            ) : (
                <div className="content-container">
                    {/* Szűrő panel */}
                    <div className="filter-panel">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Keresés receptek között..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>

                        <div className="category-filter">
                            <h3>Kategóriák</h3>
                            <button
                                className={filterCategory === 'all' ? 'active' : ''}
                                onClick={() => filterByCategory('all')}
                            >
                                Összes
                            </button>
                            <button
                                className={filterCategory === 'főétel' ? 'active' : ''}
                                onClick={() => filterByCategory('főétel')}
                            >
                                Főételek
                            </button>
                            <button
                                className={filterCategory === 'leves' ? 'active' : ''}
                                onClick={() => filterByCategory('leves')}
                            >
                                Levesek
                            </button>
                            <button
                                className={filterCategory === 'desszert' ? 'active' : ''}
                                onClick={() => filterByCategory('desszert')}
                            >
                                Desszertek
                            </button>
                        </div>
                    </div>

                    <div className="main-content">
                        {/* Receptek listája */}
                        <div className="recipe-list">
                            <h2>Receptek</h2>

                            {/* FELADAT 5: Készítsd el a receptek listáját mapping segítségével
                            - Minden recept egy kártyában jelenjen meg
                            - Jelenítsd meg a recept címét, nehézségi szintjét és elkészítési idejét
                            - Ha a recept kedvenc, jelenítsd meg egy csillag ikont (★)
                            - A kártyára kattintva válaszd ki az adott receptet
                            - Adj hozzá egy gombot, amivel a kedvencekhez lehet adni/törölni
                            - A kiválasztott recept kártyája legyen kiemelve
                            A kódodat ide írd: */}
                            {filteredRecipes.map(recipe => (
                                <div className={`recipe-card ${selectedRecipeId === recipe.id ? 'selected' : ''}`}
                                    onClick={() => selectRecipe(recipe.id)}>
                                    <h3>{recipe.title} {recipe.favorite && <span className="favorite-star">★</span>}</h3>
                                    <p>Nehézség: {recipe.difficulty}</p>
                                    <p>Elkészítési idő: {recipe.preparationTime} perc</p>
                                    <button
                                        className='favorite-button'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(recipe.id)
                                        }}>
                                            {recipe.favorite ? 'Eltávolítás a kedvencekből' : 'Hozzáadás a kedvencekhez'}
                                        </button>
                                </div>
                            ))}

                        </div>

                        {/* Kiválasztott recept részletei */}
                        <div className="recipe-details">
                            <h2>Recept részletei</h2>
                            {selectedRecipeId ? (
                                <div className="details-card">
                                    {recipes.find(r => r.id === selectedRecipeId) && (
                                        <>
                                            <h3>{recipes.find(r => r.id === selectedRecipeId)?.title}</h3>
                                            <p><strong>Kategória:</strong> {recipes.find(r => r.id === selectedRecipeId)?.category}</p>
                                            <p><strong>Elkészítési idő:</strong> {recipes.find(r => r.id === selectedRecipeId)?.preparationTime} perc</p>
                                            <p><strong>Nehézség:</strong> {recipes.find(r => r.id === selectedRecipeId)?.difficulty}</p>
                                            <div className="ingredients">
                                                <h4>Hozzávalók:</h4>
                                                <ul>
                                                    {recipes.find(r => r.id === selectedRecipeId)?.ingredients.map((ingredient, index) => (
                                                        <li key={index}>{ingredient}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <p className="select-prompt">Válassz ki egy receptet a részletekért</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeManager;