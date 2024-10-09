import express from "express"
import cors from "cors";
import cookieparser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: Process.env.CORS_ORIGIN,
    Credential: true
  })
);

app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extends: true, limit: "20kb"}))
app.use(express.static("public"))
app.use(cookieparser())

export { app }