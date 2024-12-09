import jwt from 'jsonwebtoken';

const getTokenInfoFromRequest = (req) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]; // Remove Bearer from string

        // Verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (err) {
            console.error('Error verifying token:', err);
            return null;
        }
    }

    return null;
};


export default getTokenInfoFromRequest;
