import mysql from "mysql"

export const db = mysql.createConnection({
  host:"localhost",
  user:"someuser",
  password: "somepass",
  database:"blogtemplate"
})