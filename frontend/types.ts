export type Unit = {
    _id: string,
    name: string,
    imageUrl: string,
    price: number,
    project: {
        name: string
    },
    developer: {
        name: string
    },
    zone: {
        name: string
    },
    location: {
        type: 'Point',
        coordinates: [
            number,
            number
        ]
    },
    distMeters: number,
    distanceKm: number
}