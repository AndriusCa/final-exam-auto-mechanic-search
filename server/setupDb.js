import mysql from "mysql2/promise";
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from "./env.js";

const DATABASE_RESET = false;

async function setupDb() {
  let connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
  })

  if (DATABASE_RESET) {
    await connection.execute(`DROP DATABASE IF EXISTS \`${DB_DATABASE}\``)
  }
  await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``)
  connection.query(`USE \`${DB_DATABASE}\``)

  if (DATABASE_RESET) {
  }

  return connection;
}

export const connection = await setupDb();
