const express = require("express");
const { auth: ctrl } = require("../../controler");
const { userSchemaJoi } = require("../../models");

const { validation, authMiddleware, uploadMiddleware, } = require("../../middlewars");

const validationMidleware = validation(userSchemaJoi.addUserSchemaJoi);

const router = express.Router();

router.post("/register", validationMidleware, ctrl.register);

router.post("/login", validationMidleware, ctrl.login);

router.post("/logout", authMiddleware, ctrl.logout);

router.get("/current", authMiddleware, ctrl.getCurrent);

router.patch(
  "/",
  authMiddleware,
  validation(userSchemaJoi.userSubscriptionSchemaJoi),
  ctrl.updateSubscription
  );
 
  router.patch(
    "/avatars",
    authMiddleware,
    uploadMiddleware.single("avatar"),
    ctrl.updateAvatar
);

module.exports = router;
