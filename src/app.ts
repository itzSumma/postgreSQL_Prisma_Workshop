import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./router"; // অথবা তোমার রাউটার পাথ অনুযায়ী

const app: Application = express();

app.use(cors());
app.use(express.json());

// Main Router
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Server is running...",
  });
});

export default app;