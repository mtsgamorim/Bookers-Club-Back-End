import joi from "joi";

const createBookSchema = joi.object({
  bookId: joi.string().required(),
  title: joi.string().required(),
});

export default createBookSchema;
