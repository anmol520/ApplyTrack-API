const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    // 1. Get the Authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // 2. Check if the header exists and starts with 'Bearer '
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
    }

    // 3. Extract the token from the string "Bearer <token>"
    const token = authHeader.split(' ')[1];

    // 4. Verify the token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
            }

            // 5. Attach the user info to the request object
            // Ensure your login/register logic includes 'id' and 'role' in the payload
            req.user = {
                id: decoded.id,
                role: decoded.role
            };
            
            next();
        }
    );
};

module.exports = verifyJWT;