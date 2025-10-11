const db = require('../db/queries');




exports.addMessageGet = async (req, res) => {
   await res.render('addmessage')
}

exports.addMessagePost = async (req, res) =>{
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let d = new Date()
        let  added = await d.getHours()+1  + ':' + d.getMinutes() + ' /' + ' ' + d.getDate() + ' ' + month[d.getMonth() - 1] + '. ' + d.getFullYear()
console.log(added)
       // let {firstname} = await req.body;
       let user = await req.user
       let author = user.firstname + " " + user.lastname
       let username = user.username
      let {messagetitle, messagetext} = await req.body;
   //     console.log(user)

       // if(!errors.isEmpty()){
       //     return res.status(400). render('addmessage', {
       //         errors: errors.array(),
       //     })
       // }
    //messageStorage.newMessage({ messageuser, messagetext})
    await db.newMessage(messagetitle, messagetext, author, added, username)
    await res.redirect('/')
}

exports.deleteMessagePost = async (req, res) => {
    //messageStorage.deleteMessage(req.params.id)
    let y = await req.user;
    let z = y.firstname;
    let x = req.params.id
    console.log(z)
   if(z != undefined){
    await db.deleteMessage(x)
    res.redirect('/')
   }
}
