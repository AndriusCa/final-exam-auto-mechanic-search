import express from "express";
import { connection } from "../setupDb.js";
import { hash } from "../lib/hash.js";

export const register = express.Router();

register.post("/", async (req, res) => {
  const { fullname, email, password } = req.body;

  const minFullnameSize = 2;
  const minEmailSize = 6;
  const minPasswordSize = 6;

  const errors = []
  if (typeof fullname !== "string" || fullname.length < minFullnameSize) {
    errors.push({
      input: "fullname",
      msg: "Vartotojo vardas per trumpas. Min 2 simboliai.",
    })
  }
  if (typeof email !== "string" || email.length < minEmailSize) {
    errors.push({
      input: "email",
      msg: "Per trumpas el. pašto adresas. Min 6 simboliai.",
    })
  }
  if (typeof password !== "string" || password.length < minPasswordSize) {
    errors.push({
      input: "password",
      msg: "Slaptažodis per trumpas. Min 6 simboliai.",
    })
  }

  if (errors.length > 0) {
    return res.status(409).json({ status: "err-list", errors })
  }

  try {
    const selectQuery = `SELECT * FROM users WHERE email = ?;`
    const selectRes = await connection.execute(selectQuery, [email])
    const users = selectRes[0]

    if (users.length > 0) {
      return res.status(200).json({
        status: "err-list",
        errors: [
          {
            input: "email",
            msg: "Vartotojas su tokiu el.pašto adresu jau egzistuoja.",
          },
        ],
      })
    }

    const insertQuery = `INSERT INTO users (fullname, email, password_hash) VALUES (?, ?, ?)`
    const insertRes = await connection.execute(insertQuery, [
      fullname,
      email,
      hash(password),
    ])

    const insertResObject = insertRes[0]

    if (insertResObject.insertId > 0) {
      return res.status(200).json({
        status: "ok",
        msg: "User created",
      })
    } else {
      return res.status(400).json({
        status: "err",
        msg: "User could not be created",
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "err",
      msg: "POST: REGISTER API - server error.",
    })
  }
})

register.use((req, res, next) => {
  return res.status(404).json({ msg: 'Unsupported "Register" method' })
})
