const {body, validationResult} = require('express-validator')
const bcrypt = require("bcryptjs");
const db = require('../db/queries');
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be an email adress";
const emailLengthErr = 'must be at list 8 characters and maxim 30'
const passwordErr = "must contain numbers and letters"

const validateUser = [
  body("firstname").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
  body("lastname").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
body("username").trim()
    .isEmail().withMessage(`Username ${emailErr}`)
    .isLength({ min: 8, max: 30 }).withMessage(`username ${emailLengthErr}`),
body("password").trim()
    .isAlphanumeric().withMessage(`password ${passwordErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`password ${lengthErr}`),
];
exports.firstPage = async (req, res) => {
    let x = await req.user;
    //console.log(x)
    let dply= 'none'
   let all = await db.getMessages()
    if(x != undefined){ 
        dply = 'flex' 
    }
    await res.render('index', {
            user: x,
            messages: all,
            members: await db.getUsers(),
            display: dply,
        })
    }
exports.loginGet = async (req, res) => {
    await res.render('log-in')
}
exports.signUp = async (req, res) => {
    await res.render('sign-up-form')
}
exports.signUpPost = [
    validateUser,
    async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const errors = validationResult(req)
       
        if (!errors.isEmpty()){
            return res.status(400).render('sign-up-form', {
                errors: errors.array(),
            })
        }
        let {firstname, lastname, username} = await req.body;
        let check = await db.checkUsername(username)
    if(check == undefined){
        await db.newUser(firstname, lastname, username, hashedPassword)
        await res.redirect('/')         
    }else{
        if(check != undefined){
            await res.render('sign-up-form',{
                exist: 'username exist'
            })
        }else{
            await res.redirect('/')
        }
    }
}]
exports.deleteMemberPost = async (req, res) => {
    //messageStorage.deleteMessage(req.params.id)
    let y = await req.user;
    let z = y.firstname;
    let x = await req.params.id
    //console.log(z)
   if(z != undefined){
    await db.deleteMember(x)
    res.redirect('/')
   }
}

