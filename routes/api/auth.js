const express = require("express");
const { auth: ctrl } = require("../../controler");
const { userSchemaJoi } = require("../../models");

const { validation, ctrlWrapper, authMiddleware } = require("../../middlewars");

const validationMidleware = validation(userSchemaJoi.addUserSchemaJoi);

const router = express.Router();

router.post("/singup", validationMidleware, ctrlWrapper(ctrl.singup));

router.post("/login", validationMidleware, ctrlWrapper(ctrl.login));

router.post("/logout", authMiddleware, ctrlWrapper(ctrl.logout));

router.get("/current", authMiddleware, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  authMiddleware,
  validation(userSchemaJoi.userSubscriptionSchemaJoi),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
