import express from "express";
import { users } from "../controllers/userControllers";
import { squads } from "../controllers/squadsControllers";

const router = express.Router();

router.get("/users", users.getAll);
router.get("/teams", squads.getAll);
router.get("/teams/:team", squads.getSquad);
router.post("/team", squads.postSquad);

export { router };
