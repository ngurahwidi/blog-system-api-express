import express from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../controllers/articleController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getOne);
router.post("/", authenticate, upload.single("image"), create);
router.put("/:id", authenticate, upload.single("image"), update);
router.delete("/:id", authenticate, remove);

export default router;
