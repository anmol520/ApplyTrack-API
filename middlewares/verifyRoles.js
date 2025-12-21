const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // 1. Ensure the user exists (attached by verifyJWT middleware)
        if (!req?.user?.role) {
            return res.status(401).json({ message: "Unauthorized: No role found." });
        }

        // 2. Check if the user's role is in the list of allowed roles
        const rolesArray = [...allowedRoles];
        const hasRole = rolesArray.includes(req.user.role);

        if (!hasRole) {
            return res.status(403).json({ 
                message: `Access Denied: Required role(s) [${rolesArray}] not met.` 
            });
        }

        // 3. Role is valid, proceed to controller
        next();
    };
};

module.exports = verifyRoles;