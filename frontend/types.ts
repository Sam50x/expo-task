export type Unit = {
    _id: string,
    name: string,
    imageUrl: string,
    price: number,
    project: string,
    developer: string,
    zone: string,
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