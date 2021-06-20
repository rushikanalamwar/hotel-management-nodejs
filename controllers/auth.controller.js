var jwt = require('jsonwebtoken')
var auth = require("../models/auth.model")
var HttpResponse = require("../middlewares/http-response")


//signup here
const signup = async(req, res)=>{
    const {username , password, email}= req.body

    let existingUser;
    try{
        existingUser = await auth.findOne({
            email: email
        });
    }
    catch(err){
        const error = new HttpResponse(
            'something went wrong', 500
        );
        return res.status(500).json({
            Response: error
        })
    }


    if(existingUser){
        return res.status(200).json({
            response: "Email Alrady Exists, Please Login instead"
        })
    }

    //creating new user
    const newUser = new auth({
        username,
        password,
        email
    });
    try{
        await newUser.save();
    }
    catch(err){
        const error = new HttpResponse("failed to save", 500);
        return res.status(500).json({response: error});
    }

    //generating json web token 
    let token;
    try{
        token = jwt.sign({
            email: newUser.email,
            password: newUser.password,
            username: newUser.username
        },
        "this is quoality private key",
        { expiresIn: "1h" }
        )
    }
    catch(err){
        const error = new HttpResponse("token generation failed", 500)
        return res.status(500).json({response: error})
    }

    res.status(201).json({
        userId: newUser.id,
        email: newUser.email,
        password: newUser.password,
        username: newUser.username,
        token: token
    });
};


//login here
var login = async(req, res)=>{
    const{email, username, password}= req.body;

    // checking if email exists in database
    let existingUser
    try{
        existingUser = await auth.findOne({email: email, password: password, username: username})
     }
     catch(err){
         const error = new HttpResponse("cannot find user", 500)
         return res.status(500).json({response: error})
    }
    
    if (!existingUser) {
        const error = new HttpResponse("Email not found, Please SignUp.",401);
        return res.status(500).json({ response: error });
    }

    
    

    //generating token here do not touch 
    let token;
    try {
        token = jwt.sign(
        {
            userId: existingUser.id,
            username: existingUser.username,
            email: existingUser.email
            
        },
        "this is quoality private key",
        { expiresIn: "1h" }
        );
    } catch (err) {
        const error = new HttpResponse(
        "Token generation failed, Login not done",
        500
        );
        return res.status(500).json({ response: error });
    }
    res.json({
        userId: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        password: existingUser.password,
        token: token,
    });
};

const usersCount = async(req, res) => {
    let allUsers;
    try {
      allUsers = await auth.find({});
    } catch (err) {
      const error = new HttpResponse(
        "Fetching allUsers failed, please try again later.",
        500
      );
      return res.json({ result: error });
    }
    console.log(allUsers);
    return res.json({ result: Object.keys(allUsers).length });

}

const getAllUsers = async(req, res) => {
    let allUsers;
    try {
      allUsers = await auth.find({});
    } catch (err) {
      const error = new HttpResponse(
        "Fetching allUsers failed, please try again later.",
        500
      );
      return res.json({ result: error });
    }
    console.log(allUsers);
    return res.json({ response: allUsers });

}

const getUser = async(req, res) => {
    let allUsers;
    try {
      allUsers = await auth.find({_id: req.params.id}, {$set:{hotels:hotels}});
    } catch (err) {
      const error = new HttpResponse(
        "Fetching allUsers failed, please try again later.",
        500
      );
      return res.json({ result: error });
    }
    console.log(allUsers);
    return res.json({ response: allUsers });

}

exports.signup= signup;
exports.login = login;
exports.getUser = getUser;
exports.getAllUsers = getAllUsers;
exports.usersCount = usersCount;

