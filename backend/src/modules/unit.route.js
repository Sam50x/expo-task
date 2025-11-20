import express from "express"
import Unit from "../../models/unit.model.js"
import { authenticate } from "../middleware/auth.middleware.js"
import { ResponseError } from "../middleware/response.middleware.js"

const router = express.Router()

router.post("/", authenticate, async (req, res) => {
    try {
        const unit = await Unit.create(req.body)
        res.success(201, { unit })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t create unit", e)
    }
})

router.get("/", authenticate, async (req, res) => {
    try {
        const units = await Unit.find()
            .populate("project developer zone")

        res.success(200, { units })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t get units", e)
    }
})

router.get("/:id", authenticate, async (req, res) => {
    try {
        const unit = await Unit.findById(req.params.id)
            .populate("project developer zone")

        res.success(200, { unit })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t get unit", e)
    }
})

router.put("/:id", authenticate, async (req, res) => {
    try {
        const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.success(200, { unit })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t update unit", e)
    }
})

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const unit = await Unit.findByIdAndDelete(req.params.id)
        res.success(200, { unit })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t delete unit", e)
    }
})

export default router
