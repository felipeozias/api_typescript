import express from "express";
import { users } from "../controllers/userControllers";
import { squads } from "../controllers/squadsControllers";
import authControllers from "../controllers/auth";

const router = express.Router();

// Public
router.post("/login", authControllers.login);
router.post("/users", users.createUser);

// Admin, Líderes, Funcionário
router.use(authControllers.verifyAuth);
router.get("/users/me", users.getMe);
router.get("/teams/:team", squads.getSquad);

/* Admin e lider */
router.use(authControllers.verifyAdminOrLead);
router.get("/users/:user_id", users.getById);
router.patch("/team/:team_id", squads.update);
router.post("/team/:team_id/member/:user_id", squads.addMember);
router.delete("/team/:team_id/member/:user_id", squads.removeMember);

/* Admin */
router.use(authControllers.verifyAdmin);
router.get("/users", users.getAll);
router.get("/teams", squads.getAll);
router.post("/team", squads.postSquad);

export { router };
