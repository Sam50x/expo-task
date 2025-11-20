import mongoose from "mongoose"

const DeveloperSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model("Developer", DeveloperSchema)
