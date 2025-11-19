import { loginService, signupService } from "./auth.service.js";

const authController = {
    signup: async (req, res) => {
        const data = req.body

        await signupService(data)

        res.success(201, { msg: 'User created successfully' })
    },

    login: async (req, res) => {
        const data = req.body

        const { token } = await loginService(data)

        res.success(201, { token })
    },
}

export default authController