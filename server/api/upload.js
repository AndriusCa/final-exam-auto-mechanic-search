import path from "path";
import express from "express";
import multer from "multer";

export const upload = express.Router()

/*******/
/* mechanic */ //norint upluoadinti kita faila pakeisi pvz mechanic i "avatar"
/*******/

const mechanicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/mechanic")
  },
  filename: (req, file, cb) => {
    cb(null, "mechanic_" + Date.now() + path.extname(file.originalname))
  },
})
const mechanicUpload = multer({
  storage: mechanicStorage,
  limits: {
    fileSize: 1e7,
  },
})

upload.use("/mechanic", mechanicUpload.single("mechanic_image"), (req, res) => {
  return res.status(201).json({
    status: "ok",
    msg: "Upload complete.",
    path: "images/mechanic/" + req.file.filename,
  })
})

/**********/
/* AVATAR */
/**********/

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/avatar")
  },
  filename: (req, file, cb) => {
    cb(null, "avatar_" + Date.now() + path.extname(file.originalname))
  },
})
const avatarUpload = multer({
  storage: avatarStorage,
  limits: {
    fileSize: 1e7,
  },
})

upload.use("/avatar", avatarUpload.single("avatar_image"), (req, res) => {
  return res.status(201).json({
    status: "ok",
    msg: "Upload complete.",
    path: "images/avatar/" + req.file.filename,
  })
})

/*********/
/* COVER */
/*********/

const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/cover")
  },
  filename: (req, file, cb) => {
    cb(null, "cover_" + Date.now() + path.extname(file.originalname))
  },
})
const coverUpload = multer({
  storage: coverStorage,
  limits: {
    fileSize: 1e7,
  },
})

upload.use("/cover", coverUpload.single("cover_image"), (req, res) => {
  return res.status(201).json({
    status: "ok",
    msg: "Upload complete.",
    path: "images/cover/" + req.file.filename,
  })
})

/***********/

upload.use("/", (req, res) => {
  return res.status(400).json({
    status: "err",
    msg: 'Upsupported "Upload" route.',
    options: ["http://localhost:3001/api/upload/mechanic"],
  })
})

upload.use((req, res, next) => {
  return res.status(404).json({ msg: 'Unsupported "Upload" method' })
})
