import {validSignin} from '../middlewares/autorization.middleware.js'
import {finder , addIten} from '../suports/functions.js' 
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

export async function postCreatCont (req, res){
    const {authorization} = res.locals;
    const crypt = bcrypt.hashSync(req.body.password,10);

    if(authorization) {
        return res.sendStatus(422);
    }
    try {
        const confirm = await finder('users', {email: req.body.email});

        if(confirm) {
            return res.sendStatus(409);;
        }
        await addIten('users',{...req.body, password:crypt})
        
        return res.sendStatus(201);

        } catch (error) {

        return res.send(error).status(409);
        
    }
}
export async function postSignin(req, res){
    const val = validSignin(req,res)
    const {password , email} = req.body;

    try {

        if(val){
            res.send("E-mail ou senha invalidos").status(401)
            return 
        };
        const confirm = await finder('users', {email: email});
        
        if(!confirm)return res.sendStatus(401);

        const valid = bcrypt.compareSync( password ,confirm.password)

        if(!valid)return res.sendStatus(401);

        const token = uuid();
        

        if(confirm && valid){
            await addIten('MyPage',{id: confirm._id ,token:token, name: confirm.name} )
            
            return res.send(token).status(200);
        }
        return res.sendStatus(401);
    } catch (error) {
        return res.sendStatus(401);
    }
}

export async function postExtract(req, res){
    const token = req.headers.authorization.replace('Bearer ', "");

    try {
        const dice = await finder('MyPage',{token: token});
        
        const t = await addIten('MyExtracts', {...req.body, id: dice.id} );
        
        return res.sendStatus(200)

    } catch (error) {
        return res.sendStatus(400)
    }

}