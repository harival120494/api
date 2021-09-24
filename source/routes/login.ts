import express from "express";
import controller from "../controllers/login";
const router = express.Router();
router.post('/login', controller.login);
router.post('/create', controller.create);
export = router;