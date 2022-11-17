import express from "express";
import { users } from "../controllers/userControllers";
import { squads } from "../controllers/squadsControllers";
import authControllers from "../controllers/auth";
//import { Auth } from "../auth/auth";

const router = express.Router();

router.post("/login", authControllers.login);

router.use(authControllers.verifyAuth);
router.get("/users", users.getAll);
router.get("/teams", squads.getAll);

export { router };
