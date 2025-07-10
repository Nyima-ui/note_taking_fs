import User from "../models/User.js";

//create new user
export const signup = (req, res) => {
  const { name, email, password } = req.body;
  const newUser = User.create({
    name, 
    email, 
    password
  })
};
