import React, { useEffect, useState } from 'react'

type CarType = {
    marka: string,
    modell: string,
    evjarat: number,
    uzemanyag: string,
    sebessegvalto: string,
    ar: number,
    img: string
}

const Carousel = () => {
    const [cars, setCars] = useState<CarType[]>([])
    const [carIdx, setCarIdx] = useState(0)

    useEffect(() => {
        fetch("autok.json")
            .then((response) => { return response.json() })
            .then((data: { autok: CarType[] }) => { setCars(data.autok) })  //vagy ha csak sima lista van akkor nem data.autok hanem siman autok

        // Rövidebb változat
        // fetch("autok.json")
        // .then(res => res.json())
        // .then(data => setCars(data))
        // .catch(err => console.error(err))

    }, [])

    const increase = () => {
        setCarIdx(prev => prev + 1 == cars.length ? 0 : prev + 1)
    }
    const decrease = () => {
        setCarIdx(prev => prev - 1 < 0 ? cars.length - 1 : prev - 1)
    }

    const [divOpen, setDivOpen] = useState(false)




    return (
        <div>
            {
                cars.length > 0 && <>
                    <button onClick={increase}>🦛</button>
                    <img className='kocsiKep' onClick={() => setDivOpen(prev => !prev)} src={cars[carIdx].img} />
                    <button onClick={decrease}>🐌</button>

                    {divOpen &&
                        <div className='container'>
                            <div className='sokKocsisDiv'>
                                {cars.map(car => <img src={car.img} />)}
                            </div>
                        </div>}


                </>
            }

        </div>
    )
}

export default Carousel