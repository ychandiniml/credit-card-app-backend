import express from "express";
import { validate } from "../../middleware/validate.js";
import cardController from "../controllers/cardController.js";
import { createCardValidator, updateCardValidator } from "../validators/cardValidator.js";

const router = express.Router();

router.post("/", createCardValidator(), validate, cardController.createCard);
router.get("/", cardController.getCards);
router.get("/:id", cardController.getCardById);
router.put("/:id", updateCardValidator(), validate, cardController.updateCard);
router.delete("/:id", cardController.deleteCard);

export default router;