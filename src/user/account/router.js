const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validation = require("./validation");
const auth = require("../../../lib/security/auth");


/**
 * @api {post} /v1/user/account/updateProfile Update user profile
 * @apiName updateProfile
 * @apiDescription Updates user profile settings
 * @apiGroup Account
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *  	"name": "Jan",
 *  	"lastName": "Dupa",
 *  	"email": "client@example.com",
 *  	"marketing": "true"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "success": "true"
 * }
 *
 */
router.post("/updateProfile", validation.updateProfile, auth.required, controller.updateProfile);

router.path = "/user/account";

module.exports = router;
