import {getMyExtract,getExtract} from '../comtrollers/get.Controlers.js'
import {validExtract} from '../middlewares/autorization.middleware.js'
import express from 'express';

const router = express.Router()

router.get('/MyExtract' ,validExtract, getMyExtract )

router.get('/Extract', validExtract, getExtract )

export default router;


