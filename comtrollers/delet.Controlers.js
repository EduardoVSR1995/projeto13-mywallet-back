import { ObjectId } from 'bson';
import dbs from '../db/db.js';

let db = await dbs();

export async function deleteExtract(req, res){
    const token = req.headers.authorization.replace('Bearer ', '')
    try{
       const i = await db.collection('MyExtracts').deleteOne({_id: new ObjectId(token)});
        
       return res.send(i).status(200);
    }catch(error){
       return res.sendStatus(404);
    }
}
