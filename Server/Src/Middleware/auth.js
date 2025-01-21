import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    console.log('authMiddleware');
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded>>>>', decoded);
        next();
    } catch (error) {
        console.log('error>>>>', error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}