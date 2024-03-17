import express from "express";
import { getAllTests, matchKey, uploadAnswer } from "../controller/student";

const studentRouter = express.Router();
studentRouter.route("/getAllTests").get(getAllTests);
studentRouter.route("/matchKey").post(matchKey);
studentRouter.route("/uploadAnswer").post(uploadAnswer);

export default studentRouter;
