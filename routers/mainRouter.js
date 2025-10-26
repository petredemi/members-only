const {router, Router} = require("express")
const mainControllers = require("../controllers/mainControllers")
const messagesController = require("../controllers/messagesController")
const routerMembers = Router()


routerMembers.get('/', mainControllers.firstPage)
routerMembers.get('/sign-up',mainControllers.signUp )
routerMembers.post('/sign-up', mainControllers.signUpPost)
routerMembers.get('/log-in', mainControllers.loginGet)
routerMembers.get('/addmessage', messagesController.addMessageGet)
routerMembers.post('/addmessage', messagesController.addMessagePost)

routerMembers.post('/:id/delete-message', messagesController.deleteMessagePost)
routerMembers.post('/:id/delete-member', mainControllers.deleteMemberPost)
routerMembers.post('/:id/likes', messagesController.nrLikesPost)
//routerMembers.post('/:id/nolike', messagesController.nolikePost)

//routerMembers.get('/log-out', mainControllers.logoutGet)
//routerMembers.post('/', mainControllers.logoutPost)
module.exports = routerMembers;