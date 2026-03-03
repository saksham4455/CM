import express from "express";
import {upload} from '../middleware/upload.js'

import { verifyAdmin } from "../middleware/auth.js";
import { acceptStudent, getEventCounts, getRegistrations, rejectStudent } from "../controllers/admin.controller.js";
import { registerStudent } from "../controllers/register.controller.js";

const REGISTER = express.Router();

REGISTER.post("/register", upload.single("screenshot"), registerStudent);

REGISTER.get("/admin", getRegistrations);
REGISTER.get("/counts", getEventCounts    );
REGISTER.put("/admin/accept/:id", acceptStudent);
REGISTER.put("/admin/reject/:id", rejectStudent);

export default REGISTER;