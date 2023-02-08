const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/userModel');
const createError = require("../utils/error");



exports.register = async(req, res, next) =>  {
    try{ 
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
        ...req.body,
        password:hash,        
    });    
    await newUser.save();
    res.status(201).send('Created successfully')
 }catch(error){
        next(error);
    }

}

exports.login = async(req, res, next) =>  {
    try{ 
        const user = await User.findOne({username: req.body.username});
        if(!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordCorrect) return next(createError(400, "wrong password or username"));

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT);

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token", token, {
        httpOnly: true,})
        .status(201).json({details: {...otherDetails}, isAdmin});
 }catch(error){
        next(error);
    }
}
