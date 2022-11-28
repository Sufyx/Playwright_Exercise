/**
 * 21/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
 */

async function verifyUser(req, res, next) {
    try {
        console.log("checkpoint verifyUser");
        next();
    } catch (err) {
        console.error("Caught: ", err.message);
        res.status(500).send(err);
    }
}


module.exports = { verifyUser };