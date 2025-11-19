export const successHandler = (req, res, next) => {
    res.success = (statusCode, data) => {
        if (data === undefined) {
            data = statusCode
            if (Array.isArray(data)) return res.status(200).json({ "status": "success", data })
            if (typeof data == "object") return res.status(200).json({ "status": "success", ...data })
            if (typeof data == "string") return res.status(200).json({ "status": "success", message: data })
        }
        if (!Number.isInteger(statusCode) || statusCode < 200 || statusCode > 299) throw new Error("Invalid status code on res.success")
        return res.status(statusCode || 200).json({ "status": "success", ...data })
    }
    next()
}

export const globalErrorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        "status": err.status || "error",
        "message": err.message || "Something went wrong",
        "error": err.error
    })
}

export class ResponseError extends Error {
    constructor(statusCode, message, error) {
        super(message);
        this.error = error;
        this.statusCode = parseInt(statusCode) || 500;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    }
}