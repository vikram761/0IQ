import express from "express";
import { getAllTests, matchKey } from "../controller/student";

const studentRouter = express.Router();
studentRouter.route("/getAllTests").get(getAllTests);
studentRouter.route("/matchKey").post(matchKey);

export default studentRouter;
