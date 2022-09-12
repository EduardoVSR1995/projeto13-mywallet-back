import  { stripHtml }  from  "string-strip-html" ;
import  { strict as assert }  from  "assert" ;
import joi from 'joi';

const paramSchema =  joi.object({
    name: joi.string().min(1).required(),
    email:joi.string().email().min(5).required(), 
    password:joi.string().min(4).required(),
})

const paramSchema1 =  joi.object({
    email:joi.string().email().min(5).required(), 
    password:joi.string().min(4).required(),
})

const paramSchema2 =  joi.object({
    authorization:joi.string().required(),
})


function aux(req, res, next, opt ){
    const obj = req.body;
    let validate;
    
    if(opt===0) {   
        validate= paramSchema.validate(obj)
        if(validate.error){
            const err = validate.error.details.map((value) => value.message);
            res.locals.authorization=err;
            next()
            return;
    }
        next()
    }
    if(opt===1) {   
        
        validate = paramSchema1.validate(obj)
        
        if(validate.error){
            return true;
        }
           return false;

    }
    if(opt===2) {   
        const obj1 = req.headers
        validate = paramSchema1.validate(obj)

        if(validate.error){
            return true;
        }
           return false;

    }
    


}

export function validCreate(req, res, next){
    return aux(req, res, next, 0);
}

export function validSignin(req, res){
    return aux(req, res, 0 , 1);
}

export function validExtract(req, res){
    return aux(req, res, 0 , 2);
}
