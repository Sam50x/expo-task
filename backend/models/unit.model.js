import mongoose from "mongoose"

const UnitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: String,
    price: Number,

    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    developer: { type: mongoose.Schema.Types.ObjectId, ref: "Developer" },
    zone: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },

    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

}, { timestamps: true })

UnitSchema.index({ location: "2dsphere" })

export default mongoose.model("Unit", UnitSchema)
