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

export { paramSchema, paramSchema1, paramSchema2 };
