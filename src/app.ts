import  express, { Router }  from 'express';
import cors from 'cors';
import router from './router';

const app = express();
 app.use(cors());
 app.use(express.json());

 app.use('/',Router);
 

 app.get("/", (req, res) => {
res.json({
    success: true,
    message: " Welcome...! your server is running"

});
 });

 export default app;