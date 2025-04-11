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




    return (
        <div>Carousel</div>
    )
}

export default Carousel