import Joi from "joi";

export const articleFormSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  content: Joi.string().min(10).required(),
  status: Joi.string().valid("draft", "publish").required(),
});
