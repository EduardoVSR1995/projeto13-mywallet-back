import{ ObjectId } from 'mongodb'
import { finder } from '../suports/functions.js';
import dbs from '../db/db.js'

let db = await dbs();

export async function patchExtract(req, res){
    const token = req.headers.authorization.replace('Bearer ', "");
    const {id, price, description, date} = req.body;    
    
    try {
        const dice = await finder('MyPage',{token: token});
     
        await db.collection('MyExtracts').updateOne({_id: new ObjectId(id) }, {$set: {price: price , description: description , date: date }}) ;
         
        return res.sendStatus(200)

    } catch (error) {
        return res.sendStatus(400)
    }

}