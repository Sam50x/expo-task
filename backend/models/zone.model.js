import mongoose from "mongoose"

const ZoneSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model("Zone", ZoneSchema)
