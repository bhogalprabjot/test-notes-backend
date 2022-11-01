import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../models/user.js";


export const signin = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const existingUser = await User.findOne({email});
   
        if(!existingUser) 
            return res.status(404).json({message: "User doesn't exist!" });

        const isPasswordCorect = await bcrypt.compare(password, existingUser.password);
        
        if(!isPasswordCorect)
            return res.status(400).json({message: "Invalid credentials" });


        // all the information that we want to store in the tokem (userobj, secret, expiresin)
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test',  {expiresIn: "1h"});

        res.status(200).json({result: existingUser, token})

    }catch(error){
        res.status(404).json({message: error.message });
    }
}

export const signup = async (req, res) => {
    // console.log("in controller");
    // const {email, password, confirmPassword, firstName, lastName} = req.body;
    const {email, password, firstName, lastName} = req.body;
    // console.log(req.body);
    try{
        //check for existing user
        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message: "User already exist" });

        // check for confirm password match in frontend
        // if(password != confirmPassword )
        //     return res.status(400).json({message: "Passwords don't match" });
    
        
        const hashedPassword = await bcrypt.hash(password, 12);
    
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});
        
        const token = jwt.sign({email: result.email, id: result._id}, 'test',  {expiresIn: "1h"});

        res.status(200).json({result, token});
    }catch(error){
        res.status(404).json({message: error.message });
    }
}