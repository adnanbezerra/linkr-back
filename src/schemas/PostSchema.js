import joi from "joi";

const urlSchema = joi.object({
    urlPreview: joi.string().uri().required()
});

export default urlSchema;