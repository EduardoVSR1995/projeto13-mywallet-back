import { paramSchema, paramSchema1, paramSchema2  } from "../schema/schema.js";
import  { stripHtml }  from  "string-strip-html" ;
import  { strict as assert }  from  "assert" ;


function aux(req, res, next, opt ){
    const obj = req.body;
    let validate;
    
    if(opt===0) {
        const name = obj.name;
        assert.equal(stripHtml( `${name}`).result, name);
        validate= paramSchema.validate(obj)
        if(validate.error){
            const err = validate.error.details.map((value) => value.message);
            res.locals.authorization=err;
            next()
            return true;
    }
        next()
        return false
    }
    if(opt===1) {   
        
        validate = paramSchema1.validate(obj)
        
        if(validate.error){
            return true;
        }
           return false;

    }
    if(opt===2) {   
        const obj1 = {authorization: req.headers.authorization};

        validate = paramSchema2.validate(obj1)

        if(validate.error){
            const err = validate.error.details.map((value) => value.message);
            
            return res.send(err).status(400);
        }          
            next()
        
    }
    


}

export function validCreate(req, res, next){
    return aux(req, res, next, 0);
}

export function validSignin(req, res , next){
    return aux(req, res, next , 1);
}

export function validExtract(req, res, next){
    return aux(req, res, next , 2);
}
