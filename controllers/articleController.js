import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
} from "../models/articleModel.js";

export const create = async (req, res) => {
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
    const article = await getArticleById(req.params.id);
    if (!article) {
      return res.status(200).json({
        status: "Succes",
        code: 200,
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
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Success update article",
      data: result,
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
    await deleteArticle(req.params.id);
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
