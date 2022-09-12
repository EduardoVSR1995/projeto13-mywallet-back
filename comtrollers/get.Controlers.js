import { validExtract } from '../middlewares/autorization.middleware.js';
import { finder } from '../suports/functions.js'
import { ObjectId } from 'mongodb';
import dbs from '../db/db.js';

let db = await dbs();

export async function getMyExtract(req, res) {
   if(validExtract(req,res)) return res.sendStatus(400);
   try {
      const token = req.headers.authorization.replace('Bearer ', '')

      const dice = await finder('MyPage', { token: token })

      const t = dice.id.toString();


      const list = await db.collection('MyExtracts').find({ id: ObjectId(t) }).toArray();

      return res.send(list).status(200)

   } catch (error) {
      return res.sendStatus(error);
   }
}

export async function getExtract(req, res) {
   if(validExtract(req,res)) return res.sendStatus(400);
   
   try {

      const token = req.headers.authorization.replace('Bearer ', '')

      const dice = await finder('MyPage', { token: token })

      console.log(dice)

      const user = await finder('users', { _id: dice.id })

      return res.send({ name: user.name, movements: user.movements }).status(200)

   } catch (error) {
      return res.sendStatus(error);
   }
} 