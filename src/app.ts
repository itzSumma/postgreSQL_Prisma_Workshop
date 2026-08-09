import express from "express";
import cors from "cors";
import userRoutes from "@/routes/index";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: " Welcome...! your server is running",
  });
});

app.use("/api/users", userRoutes);

export default app;
