import  { stripHtml }  from  "string-strip-html" ;
import { MongoClient } from 'mongodb';
import  { strict as assert }  from  "assert" ;
import { v4 as uuid } from 'uuid';
import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cors from 'cors';
import joi from 'joi';

dotenv.config();

const mongoClient = new MongoClient(process.env.SERVER_URI);

let db;

mongoClient.connect().then(()=> { db = mongoClient.db("MyWallet"); });

const server = express();
server.use(cors());
server.use(express.json())

const addIten = async (local ,value) =>{
    try {
        await db.collection(local).insertOne(value);
        return;
    } catch (error) {
        return error
    }
}

const finder = async (local, value) =>{
    try {
        const obj = await db.collection(local).findOne(value);
        return obj ;    
    } catch (error) {
        return error       
    }
}




server.post('/creatCont', async (req, res)=>{
    const token = bcrypt.hashSync(req.body.password,10);
    try {
        const confirm = await finder('users', {email: req.body.email});

        if(confirm) return res.sendStatus(409);

        await addIten('users',{...req.body, password:token, movements: []})
        
        res.sendStatus(201);

        } catch (error) {

        res.send(error).status(409);
        
    }
} )

server.post('/sign-in', async (req, res)=>{
    const {password , email} = req.body;
    try {
        const confirm = await finder('users', {email: email});
        const valid = bcrypt.compareSync( password ,confirm.password)
        const token = uuid();
        console.log(confirm && valid)
        if(confirm && valid){
            await addIten('MyPage',{id: confirm._id ,token:token, name: confirm.name} )
            
            return res.send(token).status(200);
        }
        res.sendStatus(401);
    } catch (error) {
        res.sendStatus(401);
    }
})

server.get('/Extract' , async (req, res)=> {
    const token = req.headers.authorization.replace('Bearer ','')
    const dice = await finder('MyPage',{token: token})
    const user = await finder('users', {_id: dice.id})
    console.log(dice,user)
    res.send({name: user.name, movements: user.movements }).status(200)
} )

server.listen(5000);