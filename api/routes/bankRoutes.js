import express from "express";
import { validate } from "../../middleware/validate.js";
import bankController from "../controllers/bankController.js";
import { createBankValidator } from "../validators/bankValidator.js";


const router = express.Router();

router.post("/", createBankValidator(), validate, bankController.createBank);
router.get("/", bankController.getBanks);
router.get("/:id", bankController.getBankById);
router.put("/:id", createBankValidator(), validate, bankController.updateBank);
router.delete("/:id", bankController.deleteBank);

export default router;