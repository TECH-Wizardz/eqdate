import express, {  Request,  Response } from "express";
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
