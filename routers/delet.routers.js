import {deleteExtract } from '../comtrollers/delet.Controlers.js'
import express from 'express';

const router = express.Router()

router.delete( "/MyExtract",deleteExtract)

export default router