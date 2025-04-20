import React, { useEffect, useState } from 'react'


type CarType = {
    marka: string,
    modell: string,
    evjarat: number,
    sebessegvalto: string,
    ar: number
}

const Cars = () => {
    const [cars, setCars] = useState<CarType[]>([])
    useEffect(() => {
        fetch("/autok.json")
            .then(response => response.json())
            .then(apiData => {
                let apiCars = apiData.autok
                apiCars.sort(() => Math.random() - 0.5)
                apiCars = apiCars.slice(0, 4)
                setCars(apiCars)
            })
    }, [])


    // useEffect(() => {
    //     console.log(cars);
    // }, [cars])

    function giveMeColor(car:CarType) {
        if(car.sebessegvalto.includes("automata")) {
            return "blue"
        } else {
            return "red"
        }
    }

    return (
        <> 
            <div className='nagyDiv'>
                {cars.map(car =>
                    <div><strong>{car.marka} </strong> {car.modell} </div>)}
            </div>
        </>
    )
}

export default Cars