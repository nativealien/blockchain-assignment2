import Response from "../models/Response.mjs"

export const loggEvent = (req, res, next) => {
    res.on('finish', () => {
        const tag = "logg"
        const log = `${tag.toUpperCase()} - ${req.method}( ${res.statusCode} ) - ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString('sv-SE')} - ${req.originalUrl} ${res.message ? ` - ${res.message}` : ''}\n`.bgMagenta
        console.log(log)
    })
    next()
    }
    
export const handleUndefined = (req, res, next) => {
    try {
        res.status(404).json(Response.error(404, 'Not found...', null))
    } catch (error) {
        next(error)
    }
}

export const handleError = (err, res ) => {
    console.log(res.message)
    res.status(500).json(Response.error(500, 'Something went wrong...', null))
}

