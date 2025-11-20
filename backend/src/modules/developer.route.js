import express from "express"
import Developer from "../../models/developer.model.js"
import { authenticate } from "../middleware/auth.middleware.js"
import { ResponseError } from "../middleware/response.middleware.js"

const router = express.Router()

router.post("/", authenticate, async (req, res) => {
    try {
        const developer = await Developer.create({ name: req.body.name })
        res.success(201, { developer })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t create developer", e)
    }
})

router.get("/", authenticate, async (req, res) => {
    try {
        const developers = await Developer.find()
        res.success(200, { developers })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t get developers", e)
    }
})

router.get("/:id", authenticate, async (req, res) => {
    try {
        const developer = await Developer.findById(req.params.id)
        res.success(200, { developer })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t get developer", e)
    }
})

router.put("/:id", authenticate, async (req, res) => {
    try {
        const developer = await Developer.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
        res.success(200, { developer })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t update developer", e)
    }
})

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const developer = await Developer.findByIdAndDelete(req.params.id)
        res.success(200, { developer })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t delete developer", e)
    }
})

export default router
