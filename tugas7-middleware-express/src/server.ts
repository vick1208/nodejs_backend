import express from "express";
import router from "./route";

const app = express();
const PORT = 3000;

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
