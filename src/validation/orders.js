import joi from "joi";

export const ValidateOrdersId = (resId) => {
    const Schema = joi.object({
        _id: joi.string().required()
    });
    return Schema.validateAsync(resId);
};