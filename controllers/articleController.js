import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
} from "../models/articleModel.js";
import { articleFormSchema } from "../validation/article/articleValidation.js";

export const create = async (req, res) => {
  const { error } = articleFormSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const { title, content, status } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const articleId = await createArticle(
      title,
      content,
      image,
      status,
      req.user.id
    );
    res.status(201).json({
      status: "Success",
      code: 201,
      message: "Article created",
      data: articleId,
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error creating article",
      data: [],
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const articles = await getAllArticles();
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Success get article",
      data: articles,
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error get article",
      data: [],
    });
  }
};

export const getOne = async (req, res) => {
  try {
    console.log(req.params.id);
    const article = await getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Article not found",
        data: [],
      });
    }

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Success get article",
      data: article,
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error get article",
      data: [],
    });
  }
};

export const update = async (req, res) => {
  const { error } = articleFormSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const { title, content, status } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const result = await updateArticle(
      req.params.id,
      title,
      content,
      image,
      status
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Article not found",
        data: [],
      });
    }

    const updatedArticle = await getArticleById(req.params.id);

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Success update article",
      data: updatedArticle,
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error update article",
      data: [],
    });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await deleteArticle(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Article not found",
        data: [],
      });
    }

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Success delete article",
      data: [],
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      code: 500,
      message: "Error delete article",
      data: [],
    });
  }
};
