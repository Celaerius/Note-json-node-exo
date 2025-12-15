
export function middlewareLogger(req, res, next) {
    const hoursNow = new Date().getHours();
    console.log(`[${hoursNow}H] - ${req.method} request to ${req.url}`);
    next();
}