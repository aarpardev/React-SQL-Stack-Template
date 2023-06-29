import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const updateUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE users SET `username`=?,`name`=?,`passwd`=?,`profldescr`=?,`img`=?,`covr`=? WHERE `uid` = ?";

    const values = [req.body.username,req.body.name,req.body.profldescr,req.body.img,req.body.covr];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};
