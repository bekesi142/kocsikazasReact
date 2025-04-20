import React, { useState, useEffect } from 'react';

// Termék típus definíciója
type ProductType = {
    id: number,
    name: string,
    price: number,
    category: string,
    stock: number,
    image: string
}

const ProductList: React.FC = () => {
    // Alap state-ek definiálása
    const [products, setProducts] = useState<ProductType[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [filteredCategory, setFilteredCategory] = useState<string>('all');
    const [selectedProductMaga, setSelectedProductMaga] = useState<ProductType>();

    // FELADAT 1: Készíts egy új useState hook-ot az oldalszámozáshoz
    // Kell egy currentPage state, ami alapértelmezetten 1
    // A kódod ide írd:
    const [currentPage, setCurrentPage] = useState(1);


    // Termékek betöltése useEffect-tel
    useEffect(() => {
        // Adat lekérése
        fetch("products.json")
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
            })
            .catch(error => {
                console.error("Hiba történt az adatok betöltésekor:", error);
            });
    }, []);

    // FELADAT 2: Készíts egy függvényt a termék kiválasztásához
    // Neve legyen selectProduct, paraméterként kapja meg a termék ID-t
    // A kódod ide írd:

    function selectProduct(productId: number) {
        // Ha már ki van választva ugyanaz a termék, akkor töröljük a kiválasztást
        if (selectedProduct === productId) {
            setSelectedProduct(null);
        } else {
            // Egyébként állítsuk be a kiválasztott terméket
            setSelectedProduct(productId);
        }
    };

    // FELADAT 3: Készíts egy függvényt, ami a kategória szűrőt kezeli
    // Neve legyen filterByCategory, paraméterként kapja meg a kategória nevét
    // A kódod ide írd:
    function filterByCategory(kategoria: string) {
        setFilteredCategory(kategoria);

    }


    // FELADAT 4: Készítsd el a szűrést a termékekre
    // Hozz létre egy filteredProducts változót, ami:
    // - Ha a filteredCategory === 'all', akkor minden terméket tartalmaz
    // - Egyébként csak az adott kategóriájú termékeket
    // A kódod ide írd:

    let filteredProducts = [];

    // Ha a filteredCategory értéke 'all', akkor minden terméket meg akarunk jeleníteni
    if (filteredCategory === 'all') {
        filteredProducts = products; // A teljes products array-t használjuk
    } else {
        // Egyébként szűrnünk kell kategória szerint
        // Létrehozunk egy új tömböt csak azokkal a termékekkel, 
        // amelyek a kiválasztott kategóriába tartoznak
        // filteredProducts = products.filter(function (product) {
        //     return product.category === filteredCategory;
        // });
        filteredProducts = [];

        // Végigmegyünk az összes terméken
        for (let i = 0; i < products.length; i++) {
            let product = products[i];

            // Ha a termék kategóriája megegyezik a szűrővel, hozzáadjuk a szűrt listához
            if (product.category === filteredCategory) {
                filteredProducts.push(product);
            }
        }
    }

    for (let i = 0; i < products.length; i++) {
        let product = products[i];

        // Ha a termék kategóriája megegyezik a szűrővel, hozzáadjuk a szűrt listához
        if (product.id === selectedProduct) {
            setSelectedProductMaga(product);
        }
    }





    return (
        <div className="product-container">
            {/* Kategória szűrő */}
            <div className="filter-section">
                <h3>Kategóriák</h3>
                <div className="filter-buttons">
                    <button onClick={() => setFilteredCategory('all')}>
                        Összes
                    </button>
                    <button onClick={() => setFilteredCategory('elektronika')}>
                        Elektronika
                    </button>
                    <button onClick={() => setFilteredCategory('ruházat')}>
                        Ruházat
                    </button>
                    <button onClick={() => setFilteredCategory('élelmiszer')}>
                        Élelmiszer
                    </button>
                </div>
            </div>

            {/* Termékek listája */}
            <div className="product-list">
                <h2>Termékek</h2>

                {/* FELADAT 5: Készítsd el a termékek listáját mapping segítségével
                   - Használd a filteredProducts változót a map függvényhez
                   - Minden termék egy kártyában jelenjen meg, benne:
                      * Termék neve
                      * Ár
                      * Készlet
                   - A kártyára kattintva hívja meg a selectProduct függvényt
                   - A kiválasztott termék kártyája legyen kiemelve
                   A kódod ide írd: */}
                <div className='product-list'>
                    {filteredProducts.map(product =>
                        <div onClick={() => selectProduct(product.id)}
                            className={selectedProduct === product.id ?
                                'list-item selected-item' : 'list-item'}
                            key={product.id}>
                            <p>{product.name}</p>
                            <p>{product.price} Ft</p>
                        </div>
                    )}
                </div>


            </div>

            {/* Termék részletek panel */}
            <div className="product-details">
                <h2>Termék részletei</h2>
                {selectedProduct !== null ? (
                    <div>
                        {/* Megkeressük a kiválasztott terméket az ID alapján */}
                        {(() => {
                            // Itt keressük meg a terméket ID alapján
                            const selectedProductObject = products.find(product => product.id === selectedProduct);

                            // Ha megtaláltuk a terméket, jelenítsük meg a részleteit
                            if (selectedProductObject) {
                                return (
                                    <div className="product-detail-card">
                                        <h3>{selectedProductObject.name}</h3>
                                        <p>Kategória: {selectedProductObject.category}</p>
                                        <p>Ár: {selectedProductObject.price} Ft</p>
                                        <p>Készleten: {selectedProductObject.stock} db</p>
                                    </div>
                                );
                            } else {
                                return <p>A termék nem található</p>;
                            }
                        })()}
                    </div>
                ) : (
                    <p>Válassz egy terméket a részletekért</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;