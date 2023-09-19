import express from "express";
import { connection } from "../setupDb.js";

export const mechanics = express.Router();

mechanics.post("/", async (req, res) => {
  const { role, id } = req.user;

  if (role !== "employer") {
    return res.status(400).json({
      status: "err",
      msg: "You`re are not a employer.",
    });
  }
   


  const { image, title, price, color, mechanicType, year, steeringWheel, location } =
    req.body;

  if (!title) {
    return res.status(400).json({
      status: "err",
      msg: "mechanic type could not be created. Provide title value.",
    });
  }

  if (!image) {
    return res.status(400).json({
      status: "err",
      msg: "mechanic type could not be created. Provide image value.",
    });
  }

  if (!price) {
    return res.status(400).json({
      status: "err",
      msg: "mechanic could not be created. Provide price value.",
    });
  }

  if (!color) {
    return res.status(400).json({
      status: "err",
      msg: "mechanic could not be created. Provide color value.",
    });
  }

  if (!mechanicType) {
    return res.status(400).json({
      status: "err",
      msg: "mechanic could not be created. Provide mechanic tyope value.",
    });
  }

  if (!year) {
    return res.status(400).json({
      status: "err",
      msg: "mechanic could not be created. Provide title value.",
    });
  }

  if (!steeringWheel) {
    return res.status(400).json({
      status: "err",
      msg: "mechanic could not be created. Provide steering wheel value.",
    });
  }

  if (!location) {
    return res.status(400).json({
      status: "err",
      msg: "mechanic could not be created. Provide locatiobn value.",
    });
  }

  try {

    const mechanicTypeQuery = `SELECT id FROM \`mechanic-types\` WHERE title = ?;`
    const mechanicTypeRes = await connection.execute(mechanicTypeQuery, [mechanicType]);
    const mechanicTypeResArray = mechanicTypeRes[0];

    if (mechanicTypeResArray.length < 1) {
      return res.status(400).json({
        status: "err",
        msg: "mechanic type value is invalid.",
      });
    }

    const mechanicTypeId = mechanicTypeResArray[0].id;

    const steeringWheelQuery = `SELECT id FROM \`steering-wheel\` WHERE side = ?;`
    const steeringWheelRes = await connection.execute(steeringWheelQuery, [steeringWheel])
    const steeringWheelResArray = steeringWheelRes[0]

    if (steeringWheelResArray.length < 1) {
      return res.status(400).json({
        status: "err",
        msg: "Steering wheel value is invalid.",
      })
    }

    const steeringWheelId = steeringWheelResArray[0].id

    const insertQuery = `INSERT INTO mechanics
       (user_id, mechanic_type_id, title, color, price, year, steering_wheel_id, location, mileage, image) VALUES (?,?,?,?,?,?,?,?,?,?)`
    const insertRes = await connection.execute(insertQuery, [
      id,
      mechanicTypeId,
      title,
      color,
      price,
      year,
      steeringWheelId,
      location,
      0,
      image
    ])
    const insertResObject = insertRes[0];

    if (insertResObject.insertId > 0) {
      return res.status(201).json({
        status: "ok",
        msg: "mechanic created",
      });
    } else {
      return res.status(400).json({
        status: "err",
        msg: "mechanic type could not bet created.",
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

mechanics.get("/", async (req, res) => {

  const role = req.user.role;
  let selectQuery = "";

  if (role === "admin") {
    selectQuery = `SELECT mechanics.id, mechanics.title, \`mechanic-types\`.title as mechanicType, mechanics.image, mechanics.price, mechanics.color, mechanics.location
                    FROM mechanics
                    INNER JOIN \`mechanic-types\` ON \`mechanic-types\`.id = mechanics.mechanic_type_id;`
  } if (role === "employer") {
    selectQuery = `SELECT * FROM mechanics WHERE user_id =?;`
  } else  { 
     return res.status(403).json({
      status: "err",
      msg: "Fordbiden",
    });
  } 
 
  try {
    const selectRes = await connection.execute(selectQuery, [req.user.id])
    const mechanics = selectRes[0];

    return res.status(200).json({
      status: "ok",
      list: mechanics,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "err",
      msg: "GET: mechanic TYPES API - server error.",
    });
  } 
});

mechanics.get("/:mechanicId", async (req, res) => {
  const { mechanicId } = req.params;

  try {
    const selectQuery = `SELECT mechanics.id, mechanics.title, \`mechanic-types\`.title as mechanicType, mechanics.image, mechanics.price, mechanics.color, mechanics.location, \`steering-wheel\`.side as steeringWheel
                            FROM mechanics
                            INNER JOIN \`mechanic-types\` ON \`mechanic-types\`.id = mechanics.mechanic_type_id
                            INNER JOIN \`steering-wheel\` ON \`steering-wheel\`.id = mechanics.steering_wheel_id
                            WHERE mechanics.id = ?;`;
    const selectRes = await connection.execute(selectQuery, [mechanicId]);
    const mechanics = selectRes[0];

    return res.status(200).json({
      status: "ok",
      mechanic: mechanics[0],
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "err",
      msg: "GET: mechanic TYPES API - server error.",
    })
  }
})


  mechanics.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "mechanics" method' })
  });
