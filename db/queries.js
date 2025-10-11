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
exports.newMessage = async (messagetitle, messagetext, author, added, username) => {
   await pool.query("INSERT INTO messages (messagetitle, messagetext, author, date, username) VALUES($1, $2, $3, $4, $5)", [messagetitle, messagetext, author, added, username]);
   }
exports.deleteMessage = async (id) =>{
  await pool.query(`DELETE FROM messages WHERE id = ${id}`)
}
exports.deleteMember = async (id) =>{
  await pool.query(`DELETE FROM users WHERE id = ${id}`)
}