import express from "express";
import { upload } from "../middleware/multer";
import {
  createTest,
  deleteSpace,
  generateAnswer,
  getAllSpaces,
  getAllTests,
  uploadFile,
} from "../controller/teacher";

const teacherRouter = express.Router();

teacherRouter.route("/upload-file").post(upload.single("pdf"), uploadFile);
teacherRouter.route("/create-test").post(createTest);
teacherRouter.route("/generate-answer").post(generateAnswer);
teacherRouter.route("/getAllSpaces").get(getAllSpaces);
teacherRouter.route("/deleteSpace").delete(deleteSpace);
teacherRouter.route("/getAllTests").get(getAllTests);

export default teacherRouter;
