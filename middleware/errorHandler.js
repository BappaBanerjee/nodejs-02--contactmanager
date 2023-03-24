const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Error", msg: err.message, stackTrace: err.stack });
            break;
        case constants.UNAUTHORISED:
            res.json({ title: "Not Authorised", msg: err.message, stackTrace: err.stack });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", msg: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", msg: err.message, stackTrace: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server error", msg: err.message, stackTrace: err.stack });
            break;
        default:
            console.log("No error");
            break;
    }

    res.json({
        title: "Not Found",
        msg: err.message,
        stackTrace: err.stack
    });
};

module.exports = errorHandler;
