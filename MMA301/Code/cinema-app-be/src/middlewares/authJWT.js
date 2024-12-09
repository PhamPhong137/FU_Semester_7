import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization;
    
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    
    token = token.split('Bearer ')[1]; // Remove Bearer from string
    const jwtSecret = process.env.JWT_SECRET;

    jwt.verify(token, jwtSecret, (error, decoded) => {
        if (error) {
            return res.status(403).send({
                message: error.message 
            });
        }
        
        req.user = decoded.user; 
        next(); 
    });
};

// function checkRole(roleName) {
//     return async function (req, res, next) {
//         try {
//             const user = await User.findById(req.userID).exec();
//             if (!user) {
//                 return res.status(400).send({ message: "User not found!" });
//             }
//             const userRole = await Role.findById(user.roleId).exec();
//             if (!userRole) {
//                 return res.status(400).send({ message: "User Role not found" });
//             }
//             if (userRole.roleName === roleName) {
//                 next(); // Nếu vai trò của người dùng đúng, tiếp tục
//             } else {
//                 return res.status(403).send({ message: `Require ${roleName} role` });
//             }
//         } catch (error) {
//             return res.status(500).send({ message: error.message });
//         }
//     };
// }


export default verifyToken;
