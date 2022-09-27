import dbs from '../db/db.js';

let db = await dbs();

export async function addIten(local ,value){
    try {
        await db.collection(local).insertOne(value);
        return;
    } catch (error) {
        return error
    }
}

export async function finder(local, value){
    try {
        const obj = await db.collection(local).findOne(value);
        return obj ;    
    } catch (error) {
        return error       
    }
}



