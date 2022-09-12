import {deleteExtract } from '../comtrollers/delet.Controlers.js'
import {validExtract} from '../middlewares/autorization.middleware.js'
import express from 'express';

const router = express.Router()

router.delete( "/MyExtract", validExtract, deleteExtract)

export default router