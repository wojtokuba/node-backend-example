const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validation = require("./validation");
const auth = require("../../lib/security/auth");

/**
 * @api {post} /v1/user/sessionKeep Keep user session
 * @apiName sessionKeep
 * @apiDescription Keeps user session and prologate it to +30 mins.
 * @apiGroup User
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "authToken": "JMyiel9WA6yS0SI5T0zy-Ap5TkgzY9hI1GkkuJxrrv5gWVHQrJ3QI7NprRPOp5hI3ZlNsN-_EyjcOFcVEHxgE7eDiw71Z9O2tb8CnO5VRxHdh9uYpel7vz61TJoFBFo_IwMDbQ",
 * }
 *
 */
router.get("/sessionKeep", validation.sessionKeep, auth.required, controller.sessionKeep);

router.path = "/user";

module.exports = router;
