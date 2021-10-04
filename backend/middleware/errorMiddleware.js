const notFound = (req,res,next) =>{
    const error = new Error(`Not FoUnD ${req.originalUrl}`)
    // console.log(error , "error in the first".red.inverse)
    res.status(404)
    next(error)
}

const errorHandler =(err , req, res, next) =>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    // console.log(statusCode , "status code second".green.inverse);
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export {notFound , errorHandler}