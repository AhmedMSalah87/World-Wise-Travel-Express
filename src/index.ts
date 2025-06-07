import express, { Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import cityRouter from "./routes/city.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", authRouter);
app.use("/api/cities", cityRouter);
app.use("/api/users", cityRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("Server running on port 3000 and hi");
});
