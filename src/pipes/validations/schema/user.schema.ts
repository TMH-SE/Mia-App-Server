const Joi = require('@hapi/joi')

export const CreateUserSchema = Joi.object().keys({
  name: Joi.string(),
  username: Joi.string(),
  password: Joi.string()
})