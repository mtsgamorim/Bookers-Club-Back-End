import joi from "joi";

const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  name: joi.string().required(),
  image: joi.string().uri().required(),
});

export default userSchema;
