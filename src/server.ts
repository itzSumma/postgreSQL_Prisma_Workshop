import app from "./app";
import dotenv from "dotenv";
dotenv.config();


 
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Welcome...! your server is running on port ${PORT}`);
});