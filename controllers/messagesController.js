const db = require('../db/queries');


exports.addMessageGet = async (req, res) => {
   await res.render('addmessage')
}

exports.addMessagePost = async (req, res) =>{
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let d = new Date()
        let  added = await d.getHours()+1  + ':' + d.getMinutes() + ' /' + ' ' + d.getDate() + ' ' + month[d.getMonth() - 1] + '. ' + d.getFullYear()
       // let {firstname} = await req.body;
       let user = await req.user
       let author = user.firstname + " " + user.lastname
       let username = user.username
       let userid = user.id;
      let {messagetitle, messagetext} = await req.body;
    await db.newMessage(messagetitle, messagetext, author, added, username, userid)
    await res.redirect('/')
}

exports.deleteMessagePost = async (req, res) => {
    //messageStorage.deleteMessage(req.params.id)
    let y = await req.user;
    let z = y.firstname;
    let x = await req.params.id
   // console.log(z)
   if(z != undefined){
    await db.deleteMessage(x)
    res.redirect('/')
   }
}
exports.nrLikesPost = async (req, res) => {
   let exist;
   let messageID = await req.params.id
   let userID = await req.user.id
   let {yes, no} = await req.body
   console.log(yes + ' ' + no)
   console.log(userID + ' user id')
   let check = await db.checkExist(userID, messageID)
   if(check.length == 0){ 
      exist = false
   }else{
      exist = true
   }
   if(!exist){
         if( yes == 'yes'){
            await db.nrLikes(messageID, userID, 'true', 'false')
         }
         if( no == 'no'){
            await db.nrLikes(messageID, userID, 'false', 'true')
         }
         let count = await db.countLikes(messageID, 'true')
         let countNo = await db.countNoLikes(messageID, 'true')
         let nr = count.count
         let nr_no = countNo.count
         await db.incrementLike(nr, messageID)
         await db.incrementNoLike(nr_no, messageID)
   }else{
         let x = await db.getIdLikes(messageID, userID)
         if( yes == 'yes'){
            if(x.likes == 'true'){
               await db.updateLikes('false', x.id)
            
            }else if (x.likes == 'false'){
               await db.updateLikes('true', x.id)
               if( x.nolikes == 'true'){
                  await db.updateNoLikes('false', x.id)
               }
            }
         }
         if( no == 'no'){
            if(x.nolikes == 'true'){
               await db.updateNoLikes('false', x.id)
            }else if (x.nolikes == 'false'){
               await db.updateNoLikes('true', x.id)
               if(x.likes == 'true'){
                  await db.updateLikes('false', x.id)
               }
            }
         }
         let count = await db.countLikes(messageID, 'true')
         let nr = count.count
         let countNo = await db.countNoLikes(messageID, 'true')
         let nr_no = countNo.count
        // console.log(countNo)
       //  console.log(count)
         await db.incrementLike(nr, messageID)
         await db.incrementNoLike(nr_no, messageID)
   }
   await res.redirect(`/#${messageID}`)
}











/*
let like = 0;
exports.incrementPost = async (req, res) => {
   let idx = req.params.id;
   let user = await req.user;
   let x = await db.getMessage(idx);
   let z = Number(x[0].yeslike);
   console.log(like);
   if(user != undefined){
      if (like == 0){
         if (z > 0){
            await db.incrementLike(z -1, idx )
         //   like = 1;
            }
         like = 1
      }else if(like == 1 ){ 
            await db.incrementLike(z + 1, idx )
           
            like = 0
      }
   }
   res.redirect('/')
}
let no = 0
exports.nolikePost = async (req, res) => {
   let idx = req.params.id
   let user = await req.user
   let x = await db.getMessage(idx)
   let z = Number(x[0].nolike)
   if(user){
         if (no == 0){
            if (z > 0){
           await db.noLike(z -1, idx )
            no = 1;
          //  console.log(like)
            }
            no = 1
         }else if(no == 1 ){ 
          await db.noLike(z + 1, idx )   
            no = 0
            }
   }
   res.redirect('/')
}
   */