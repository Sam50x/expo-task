import express from "express"
import Zone from "../../models/zone.model.js"
import { authenticate } from "../middleware/auth.middleware.js"
import { ResponseError } from "../middleware/response.middleware.js"

const router = express.Router()

router.post("/", authenticate, async (req, res) => {
    try {
        const zone = await Zone.create({ name: req.body.name })
        res.success(201, { zone })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t create zone", e)
    }
})

router.get("/", authenticate, async (req, res) => {
    try {
        const zones = await Zone.find()
        res.success(200, { zones })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t get zones", e)
    }
})

router.get("/:id", authenticate, async (req, res) => {
    try {
        const zone = await Zone.findById(req.params.id)
        res.success(200, { zone })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t get zone", e)
    }
})

router.put("/:id", authenticate, async (req, res) => {
    try {
        const zone = await Zone.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
        res.success(200, { zone })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t update zone", e)
    }
})

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const zone = await Zone.findByIdAndDelete(req.params.id)
        res.success(200, { zone })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t delete zone", e)
    }
})

export default router
