import { finder } from '../suports/functions.js';
import { ObjectId } from 'mongodb';
import dbs from '../db/db.js'

let db = await dbs();

export async function patchExtract(req, res){
    const token = req.headers.authorization.replace('Bearer ', "");
    
    try {

        const dice = await finder('MyPage',{token: token});
        const i = await db.collection('MyExtracts').find({}).toArray()
        console.log(i,dice)
    
        await db.collection('MyExtracts').updatOne({id: dice.id }, {$set: {price: req.body.price , description: req.body.description , date: req.body.date }}) ;
        
        return res.sendStatus(200)

    } catch (error) {
        return res.sendStatus(400)
    }

}