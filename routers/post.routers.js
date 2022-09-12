import  {postCreatCont, postSignin, postExtract }  from "../comtrollers/push.Controlers.js";
import  {validCreate }  from "../middlewares/autorization.middleware.js";
import express from 'express';

const router = express.Router()

router.post('/Extract' ,postExtract )

router.post('/sign-in', postSignin )

router.use(validCreate);

router.post('/creatCont', postCreatCont )


export default router;