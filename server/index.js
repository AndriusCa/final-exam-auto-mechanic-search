import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { SERVER_PORT } from "./env.js";
import { connection } from "../server/setupDb.js";
import { api } from "./api/api.js";

const app = express();

const corsOptions = {
  credentials: true,
  methods: `GET,POST,PUT,DELETE`,
  origin: 'http://localhost:3000',
};

const helmetOptions = {
  crossOriginResourcePolicy: false,
};

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use(express.static('public'));


app.use(async (req, res, next) => {
  const { mechanicsToken } = req.cookies; 

  req.user = {
    id: -1,
    role: "public",
    isBlocked: false,
  };

  if (!mechanicsToken) {
    return next();
  } 

  try {
    const selectQuery = `SELECT users.id, users.is_blocked, roles.role FROM tokens
                            INNER JOIN users ON tokens.user_id = users.id
                            INNER JOIN roles ON roles.id = users.role_id
                            WHERE token = ?;`
    const selectRes = await connection.execute(selectQuery, [mechanicsToken])
    const tokens = selectRes[0]; 

    if (tokens.length === 1) {
      req.user.id = tokens[0].id;
      req.user.isBlocked = tokens[0].is_blocked;
      req.user.role = tokens[0].role;
    }
  } catch (error) {
    console.log(error)
  }

  next();
})


app.use('/api', api);

app.get("*", (_req, res) => {
  return res.status(200).json({ msg: "What are you looking for? 👀" });
});

app.use((_req, res, _next) => {
  return res.status(404).json({ msg: "Sorry can't find that!" });
});

app.use((err, _req, res, _next) => {
  console.error(err.stack)
  return res.status(500).json({ msg: "Something broke!" });
});

app.listen(SERVER_PORT);