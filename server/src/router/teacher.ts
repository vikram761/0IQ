import express from "express";
import { upload } from "../middleware/multer";
import { uploadFile } from "../controller/teacher";

const teacherRouter = express.Router();

teacherRouter.route("/upload-file").post(upload.single("pdf"), uploadFile);

export default teacherRouter;
