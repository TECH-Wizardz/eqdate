import express, {  Request,  Response } from "express";
import 'dotenv/config'
import routes from './routes';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
