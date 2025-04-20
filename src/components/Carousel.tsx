import React, { useState, useEffect } from 'react';

// Az autó típus definíciója
type CarType = {
    marka: string,
    modell: string,
    evjarat: number,
    uzemanyag: string,
    sebessegvalto: string,
    ar: number,
    img: string
}

const Carousel: React.FC = () => {
    // State-ek definíciója
    const [cars, setCars] = useState<CarType[]>([]); // Az autók listája
    const [carIdx, setCarIdx] = useState(0); // A kiválasztott autó indexe

    // useEffect hook: komponens betöltésekor fut le
    useEffect(() => {
        // Adatok lekérése a JSON fájlból
        fetch("autok.json")
            .then((response) => response.json()) // JSON válasz feldolgozása
            .then((data: { autok: CarType[] }) => {
                setCars(data.autok); // Autók beállítása a state-ben
            })
            .catch(error => {
                console.error("Hiba az adatok betöltésekor:", error);
            });
    }, []); // Üres függőségi tömb: csak egyszer fut le a komponens mountolásakor

    // Autó kiválasztása funkció
    const handleSelectCar = (index: number) => {
        setCarIdx(index); // Kiválasztott autó indexének frissítése
    };

    return (
        <div className="carousel-container">
            {/* Bal oldalon az autók listája */}
            <div className='mainContainer'>
                <div className="car-list">

                    <ul>
                        {/* Az autók listájának bejárása és megjelenítése */}
                        {cars.map((car, index) => (
                            // Minden autóhoz egy list item és egy gomb
                            <li key={index}>
                                <button
                                    onClick={() => handleSelectCar(index)}
                                // Kiemeljük a jelenleg kiválasztott autót

                                >
                                    {car.marka} {car.modell}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>


                {/* Itt később megjelenítheted a kiválasztott autó részleteit */}
                <div className="car-details">
                    {/* A jobb oldalra kerülhet majd a részletes nézet */}
                </div>
            </div>
        </div>
    );
};

export default Carousel;