const express = require('express')

const { contacts: ctrl } = require("../../controler/index");

const {
  isValidId,
  validation,
  validationFavorite,
  ctrlWrapper,
  authMiddleware,
} = require("../../middlewars");

const { schemas } = require("../../models/index");

const validationMidleware = validation(schemas.addSchemaJoi);

const router = express.Router();

router.get("/", authMiddleware, ctrlWrapper(ctrl.getlistContacts));

router.get(
  "/:contactId",
  authMiddleware,
  isValidId,
  ctrlWrapper(ctrl.getContact)
);

router.post(
  "/",
  authMiddleware,
  validationMidleware,
  ctrlWrapper(ctrl.createContact)
);

router.put(
  "/:contactId",
  authMiddleware,
  isValidId,
  validationMidleware,
  ctrlWrapper(ctrl.changeContact)
);

router.delete(
  "/:contactId",
  authMiddleware,
  isValidId,
  ctrlWrapper(ctrl.deleteContact)
);

router.patch(
  "/:contactId/favorite",
  authMiddleware,
  isValidId,
  validationFavorite(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router
