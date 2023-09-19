import express from "express";
import { connection } from "../setupDb.js";

export const mechanicTypes = express.Router();

mechanicTypes.post("/", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      status: "err",
      msg: "mechanic type could not be created. Provide title value.",
    });
  }

  try {
    const selectQuery = `SELECT * FROM \`mechanic-types\` WHERE title = ?;`
    const selectRes = await connection.execute(selectQuery, [title])
    const mechanicTypes = selectRes[0];

    if (mechanicTypes.length > 0) {
      return res.status(200).json({
        status: "err-list",
        errors: [
          {
            input: "mechanicType",
            msg: "Such mechanic title already exists.",
          },
        ],
      })
    }

    const insertQuery = `INSERT INTO \`mechanic-types\` (title) VALUES (?)`
    const insertRes = await connection.execute(insertQuery, [title]);
    const insertResObject = insertRes[0];

    if (insertResObject.insertId > 0) {
      return res.status(200).json({
        status: "ok",
        msg: "mechanic type created successfully.",
      });
    } else {
      return res.status(400).json({
        status: "err",
        msg: "mechanic type could not bet created. Please try again later.",
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "err",
      msg: "POST: mechanic TYPES API - server error.",
    })
  }
});

mechanicTypes.get("/", async (req, res) => {

  try {
    const selectQuery = `SELECT title FROM \`mechanic-types\`;`;
    const selectRes = await connection.execute(selectQuery)
    const mechanicTypes = selectRes[0];

    return res.status(200).json({
      status: "ok",
      list: mechanicTypes,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "err",
      msg: "GET: mechanic TYPES API - server error.",
    })
  }
});

mechanicTypes.delete("/:title", async (req, res) => {
  const { title } = req.params;

  try {
    const deleteQuery = `DELETE FROM \`mechanic-types\` WHERE title = ?;`
    const deleteRes = await connection.execute(deleteQuery, [title])
    const mechanicTypes = deleteRes[0]

    if (mechanicTypes.affectedRows > 0) {
      return res.status(200).json({
        status: "ok",
        msg: "mechanic type deleted.",
      })
    } else {
      return res.status(400).json({
        status: "err",
        msg: "There was nothing to delete.",
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: "err",
      msg: "DELETE: TOB TYPES API - server error.",
    })
  }
});

mechanicTypes.put("/:oldTitle", async (req, res) => {
  const { oldTitle } = req.params;
  const { newTitle } = req.body;

  if (!oldTitle || !newTitle) {
    return res.status(400).json({
      status: "err",
      msg: 'mechanic type could not be created. Provide "title" values.',
    })
  }

  try {
    const selectQuery = `SELECT * FROM \`mechanic-types\` WHERE title = ?;`
    const selectRes = await connection.execute(selectQuery, [newTitle])
    const mechanicTypes = selectRes[0]

    if (mechanicTypes.length > 0) {
      return res.status(200).json({
        status: "err-list",
        errors: [
          {
            input: "mechanicTypes",
            msg: "Such mechanic type already exists.",
          },
        ],
      })
    }

    const updateQuery = `UPDATE \`mechanic-types\` SET title = ? WHERE title = ?`
    const updateRes = await connection.execute(updateQuery, [
      newTitle,
      oldTitle,
    ])
    const updateResObject = updateRes[0]

    if (updateResObject.affectedRows > 0) {
      return res.status(200).json({
        status: "ok",
        msg: "mechanic type updated.",
      })
    } else {
      return res.status(400).json({
        status: "err",
        msg: "mechanic type could not be updated.",
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: "err",
      msg: "PUT: mechanic TYPES API - server error.",
    })
  }
});


  mechanicTypes.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "mechanic types" method' })
  });
