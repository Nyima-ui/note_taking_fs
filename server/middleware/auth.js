import jwt from 'jsonwebtoken'; 

export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 
    
}