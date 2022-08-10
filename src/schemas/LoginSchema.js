import joi from 'joi';

const LoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().trim().required()
});

export default LoginSchema;