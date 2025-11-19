import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import User from '../../models/user.model.js'
import { ResponseError } from "../middleware/response.middleware.js"

export const signupService = async (data) => {
    try {
        const {
            name,
            email,
            password,
        } = data

        if (!name || !email || !password) {
            throw new ResponseError(400, 'All fields are required to continue')
        }

        const exists = await User.findOne({ email })

        if (exists) {
            throw new ResponseError(400, 'There is already a user signed with this email')
        }

        const passwordHash = await bcrypt.hash(password, 10)

        await User.create({ name, email, passwordHash })

    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t sign up user", e)
    }
}

export const loginService = async (data) => {
    try {
        const {
            email,
            password,
        } = data

        if (!email || !password) {
            throw new ResponseError(400, 'All fields are required to continue')
        }

        const user = await User.findOne({ email })

        if (!user) {
            throw new ResponseError(400, 'No user found with this email')
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

        if (!isPasswordCorrect) {
            throw new ResponseError(400, 'Password is incorrect')
        }

        const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET)

        return { token }

    } catch (e) {
        if (e instanceof ResponseError) {
            throw e
        }

        throw new ResponseError(500, "Couldn\'t login user", e)
    }
}