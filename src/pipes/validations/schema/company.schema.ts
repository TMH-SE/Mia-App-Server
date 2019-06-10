const Joi = require('@hapi/joi')

export const AddCompanySchema = Joi.object().keys({
  name: Joi.string().min(5),
  pic: Joi.string(),
  address: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
  skype: Joi.string(),
  note: Joi.string(),
  status: Joi.number(),
  user: Joi.string()
})