import express from 'express';
import { create, read, remove, update } from '../controllers/curdController.js';

const router = express.Router();

router.get("/",read);
router.post("/create",create);
router.put("/update",update);
router.delete("/delete/:id",remove)

export default router;