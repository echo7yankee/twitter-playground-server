//Validation
import Joi from '@hapi/joi';

export function registerValidation(data) {
  const schema = {
    confirmPassword: Joi.any()
      .valid(Joi.ref('password'))
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    fName: Joi.string()
      .min(2)
      .required(),
    lName: Joi.string()
      .min(2)
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
  };

  return Joi.validate(data, schema);
};

export function loginValidation(data) {
  const schema = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .required()
  };

  return Joi.validate(data, schema);
};
