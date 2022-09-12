import {getMyExtract,getExtract} from '../comtrollers/get.Controlers.js'
import express from 'express';

const router = express.Router()

router.get('/MyExtract' , getMyExtract )

router.get('/Extract' , getExtract )

export default router;


