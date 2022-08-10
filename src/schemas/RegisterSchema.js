import joi from 'joi';

const RegisterSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().trim().required(),
    imageUrl: joi.string().uri().trim().required(),
    password: joi.string().trim().required()
})

export default RegisterSchema;