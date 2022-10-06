import joi from "joi";

const createBookSchema = joi.object({
  bookId: joi.string().required(),
  title: joi.string().required(),
  image: joi.string().uri().required(),
});

export default createBookSchema;
