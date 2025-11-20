import express from "express"
import mongoose from "mongoose"
import Unit from "../../models/unit.model.js"
import { ResponseError } from "../middleware/response.middleware.js"
import { authenticate } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/nearby", authenticate, async (req, res) => {
    try {
        const { userLat, userLng, radius = 10, page = 1, limit = 10, project, developer, zone } = req.query

        if (!userLat || !userLng) {
            throw new ResponseError(400, "Need Valid Coordinates")
        }

        const lat = parseFloat(userLat)
        const lng = parseFloat(userLng)
        if (Number.isNaN(lat) || Number.isNaN(lng)) {
            throw new ResponseError(400, "Need Number Coordinates")
        }

        const radiusMeters = Math.max(0.1, parseFloat(radius) || 10) * 1000

        const pageNum = Math.max(1, parseInt(page) || 1)
        const rawLimit = Math.max(1, Math.min(parseInt(limit) || 10, 50))
        const skip = (pageNum - 1) * rawLimit

        const filters = {}
        if (project && mongoose.Types.ObjectId.isValid(project)) filters.project = project
        if (developer && mongoose.Types.ObjectId.isValid(developer)) filters.developer = developer
        if (zone && mongoose.Types.ObjectId.isValid(zone)) filters.zone = zone

        const agg = [
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [lng, lat] },
                    distanceField: "distMeters",
                    spherical: true,
                    maxDistance: radiusMeters,
                    query: filters
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
                        { $skip: skip },
                        { $limit: rawLimit },
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
        ]

        const result = await Unit.aggregate(agg).exec()

        const data = result[0].paginatedResults
        const totalCount = result[0].totalCount[0].count

        return res.success(200, { data, totalCount })
    } catch (err) {
        throw new ResponseError(400, "Couldn\'t search for units")
    }
})

export default router
