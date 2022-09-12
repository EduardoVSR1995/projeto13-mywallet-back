import { patchExtract } from '../comtrollers/patch.controler.js';
import express from 'express';

const router = express.Router()

router.patch('/MyExtract' ,patchExtract )

export default router;