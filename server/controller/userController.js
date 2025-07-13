import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";

//create new user
// export const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password)
//       res.status(401).json({ message: "Missing cridentials" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = await User.create({
//       name,
//       email,
//       password : hashedPassword,
//     });
//     const token = generateToken(newUser);

//     const userToReturn = newUser.toObject(); 
//     delete userToReturn.password; 

//     res.status(200).json({
//       success: true,
//       user : userToReturn,
//       token,
//     });
//   } catch (error) {
//     console.error(error.message); 
//     res.status(500).json({
//       success: false,
//       message: "Internal Server error",
//       error,
//     });
//   }
// };


//login 
// export const login = (req, res) => {
    
// }