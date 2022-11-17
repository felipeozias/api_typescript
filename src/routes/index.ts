import express from "express";
import { users } from "../controllers/userControllers";
import { squads } from "../controllers/squadsControllers";

const router = express.Router();

router.get("/users", users.getAll);
router.post("/users", users.createUser);





router.get("/teams", squads.getAll);
router.get("/teams/:team", squads.getSquad);
router.post("/team", squads.postSquad);
router.patch("/team/:team_id", squads.update);
router.delete("/team/:team_id/member/:user_id", squads.removeMember);
router.post("/team/:team_id/member/:user_id", squads.addMember);
export { router };
