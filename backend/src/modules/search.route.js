import express from "express"
import mongoose from "mongoose"
import Unit from "../../models/unit.model.js"
import { ResponseError } from "../middleware/response.middleware.js"
import { authenticate } from "../middleware/auth.middleware.js"
import connectDB from "../../config/db.js"

const router = express.Router()

router.get("/nearby", authenticate, async (req, res) => {
    try {
        await connectDB()
        const { userLat, userLng, radius = 10 } = req.query
        if (!userLat || !userLng) {
            throw new ResponseError(400, "Need Valid Coordinates")
        }
        const lat = parseFloat(userLat)
        const lng = parseFloat(userLng)
        if (Number.isNaN(lat) || Number.isNaN(lng)) {
            throw new ResponseError(400, "Need Number Coordinates")
        }

        const radiusMeters = Math.max(0.1, parseFloat(radius) || 10) * 1000

        const agg = [
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [lng, lat] },
                    distanceField: "distMeters",
                    spherical: true,
                    maxDistance: radiusMeters,
                }
            },
            {
                $project: {
                    name: 1,
                    imageUrl: 1,
                    price: 1,
                    project: 1,
                    developer: 1,
                    zone: 1,
                    location: 1,
                    distMeters: 1,
                    distanceKm: { $divide: ["$distMeters", 1000] }
                }
            },
            {
                $facet: {
                    paginatedResults: [
                        { $sort: { distMeters: 1 } },
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
        ]
        const result = await Unit.aggregate(agg).exec()
        let data
        let totalCount

        if (result[0] && result[0].paginatedResults && result[0].totalCount){
            data = result[0].paginatedResults
            totalCount = result[0].totalCount[0].count
        }
        else{
            data = []
            totalCount = 0
        }

        return res.success(200, { data, totalCount })
    } catch (e) {
        throw new ResponseError(400, "Couldn\'t search for units", e)
    }
})

export default router
