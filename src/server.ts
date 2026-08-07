import  cors  from 'cors';
import express from "express";

const app = express();
  app.use(cors());

 

  const startServer = async () => {
     app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
  });
  }
       startServer();