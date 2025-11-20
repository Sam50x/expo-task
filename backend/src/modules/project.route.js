import express from "express"
import Project from "../../models/project.model.js"
import { authenticate } from "../middleware/auth.middleware.js"
import { ResponseError } from "../middleware/response.middleware.js"

const router = express.Router()

router.post("/", authenticate, async (req, res) => {
    try {
        const project = await Project.create({ name: req.body.name })
        res.success(201, { project })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t create project", e)
    }
})

router.get("/", authenticate, async (req, res) => {
    try {
        const projects = await Project.find()
        res.success(200, { projects })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t get projects", e)
    }
})

router.get("/:id", authenticate, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        res.success(200, { project })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t get project", e)
    }
})

router.put("/:id", authenticate, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
        res.success(200, { project })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t update project", e)
    }
})

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id)
        res.success(200, { project })
    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t delete project", e)
    }
})

export default router
