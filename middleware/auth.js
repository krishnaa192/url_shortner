const {getUser} = require('../utils/auth');


async function Userauth(req, res, next) {
    const uid = req.headers["authorization"]
    if (!uid) {
        return res.redirect('login');
    }
    const token = uid.split('Bearer ')[1];
    const user = getUser(token);
    if (!user) {
        return res.redirect('login');
    }
    req.user = user;

    next();
}

async function Checkauth(req, res, next) {
    try {
        // Check if Authorization header is present
        const uid = req.headers["authorization"];

        // Check if the header starts with 'Bearer'
        if (!uid || !uid.startsWith('Bearer ')) {
            return res.redirect('login');
        }

        const token = uid.split('Bearer ')[1];

        // Assuming getUser is an async function
        const user = await getUser(token);

        // Store user object in req.user
        req.user = user;

        // Call the next middleware
        next();
    } catch (error) {
        // Handle any errors that occur during the authentication process
        console.error("Error in authentication middleware:", error);
        res.status(500).send("Internal Server Error");
    }
}



module.exports = {Userauth
,Checkauth};