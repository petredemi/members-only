const pool = require('./pool');
exports.checkUsername = async (x) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = ($1)", [x]);
  return rows[0];
}
exports.newUser = async (x, y, z, w) =>{
    await pool.query("INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4)",
      [x, y, z, w])
}
exports.getUsers = async () => {
  const { rows } = await pool.query("SELECT * FROM users");
  //return Object.values(rows)
  return rows
}


exports.getMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages ORDER BY id DESC");
  return Object.values(rows)
}
exports.getMessage = async (idx) => {
  const {rows} = await pool.query("SELECT * FROM messages WHERE id = ($1)", [idx])
  return  rows[0]
}
exports.newMessage = async (messagetitle, messagetext, author, added, username, userID,) => {
   await pool.query("INSERT INTO messages (messagetitle, messagetext, author, date, username, authorID) VALUES($1, $2, $3, $4, $5, $6)", [messagetitle, messagetext, author, added, username, userID]);
  
  }
exports.deleteMessage = async (id) =>{
  await pool.query(`DELETE FROM messages WHERE id = ${id}`)
}
exports.deleteMember = async (id) =>{
  await pool.query(`DELETE FROM users WHERE id = ${id}`)
}
exports.incrementLike = async (count, messageID) => {
  await pool.query("UPDATE messages SET yeslike = ($1) WHERE id = ($2)", [count, messageID])
} 
exports.noLike = async (x, idx) => {
  await pool.query("UPDATE messages SET nolike = ($1) WHERE id = ($2)", [x, idx])

}
exports.nrLikes = async (messageID, userID, likes ) => {
  //await pool.query("UPDATE likes SET likes = ($1) WHERE id = ($2)", [x, messageID])
   await pool.query ("INSERT  INTO likes (messageID, userID, likes) VALUES ($1, $2, $3)", [messageID, userID, likes])
} 
exports.checkExist = async (userID, messageID) => {
  let {rows} = await pool.query("SELECT id FROM likes WHERE EXISTS (SELECT userID FROM likes WHERE userID = $1 AND messageID = $2)", [userID, messageID])
    return rows
}
exports.countLikes = async (messageID, likes) => {
  let {rows} = await pool.query("SELECT COUNT(id) FROM likes WHERE messageID = $1 AND likes = $2", [messageID, likes])
  return rows[0]
}
exports.updateLikes = async (likes, id) => {
  await pool.query("UPDATE likes SET likes = $1 WHERE id = $2", [likes, id])
} 
exports.getIdLikes = async (messageID, userID) =>{
  const {rows} = await pool.query("SELECT * FROM likes WHERE messageID = $1 AND userID = $2", [messageID, userID])
  return rows[0]
}