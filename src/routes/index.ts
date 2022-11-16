import express from "express";
import { users } from "../controllers/userControllers";
import { squads } from "../controllers/squadsControllers";
import authControllers from "../controllers/auth";
import auth from "../auth/auth";

const router = express.Router();

router.post("/login", authControllers.login);

router.use(auth.verifyAuth);
router.get("/users", users.getAll);
router.get("/teams", squads.getAll);

export { router };
