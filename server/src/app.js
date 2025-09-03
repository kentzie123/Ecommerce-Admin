import express from "express";
import cors from "cors";

const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const app = express();

app.use(express.json());
app.use(cors({
    origin: clientOrigin,
    credentials: true,
}));

export default app;