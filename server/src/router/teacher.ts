import express from "express";
import { upload } from "../middleware/multer";
import { createTest, generateAnswer, uploadFile } from "../controller/teacher";

const teacherRouter = express.Router();

teacherRouter.route("/upload-file").post(upload.single("pdf"), uploadFile);
teacherRouter.route("/create-test").post(createTest);
teacherRouter.route("/generate-answer").post(generateAnswer);
export default teacherRouter;
