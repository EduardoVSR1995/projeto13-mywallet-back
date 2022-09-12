import  {postCreatCont, postSignin, postExtract }  from "../comtrollers/push.Controlers.js";
import  {validCreate }  from "../middlewares/autorization.middleware.js";
import express from 'express';

const router = express.Router()

router.post('/Extract' ,postExtract )

router.post('/sign-in', postSignin )

router.post('/creatCont', validCreate, postCreatCont )


export default router;