const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validation = require("./validation");

/**
 * @api {post} /v1/user/security/register Register new user
 * @apiName registerUser
 * @apiDescription Registers new user in platform.
 * @apiGroup User
 *
 * @apiParam {String} name Name of the user
 * @apiParam {String} lastName Surname of the user
 * @apiParam {String} email Email of the user
 * @apiParam {String} password Password of the user
 * @apiParam {Boolean} marketing Does user allows to receive marketing emails
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *  	"name": "Adam",
 *  	"lastName": "Niezgódka",
 *  	"email": "client@example.com",
 *  	"password": "Testy1234",
 *		"marketing": "true"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "success":true,
 *    "email": "client@example.com",
 *    "name": "Adam",
 *    "lastName": "Niezgódka"
 * }
 *
 */
router.post("/register", validation.registerUser, controller.registerUser);

/**
 * @api {post} /v1/user/security/activate Activate new user
 * @apiName activateUser
 * @apiDescription Activates created user
 * @apiGroup User
 *
 * @apiParam {String} token Token generated for an user and sent in email
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *  	"token": "JMyiel9WA6yS0SI5T0zy-Ap5TkgzY9hI1GkkuJxrrv5gWVHQrJ3QI7NprRPOp5hI3ZlNsN-_EyjcOFcVEHxgE7eDiw71Z9O2tb8CnO5VRxHdh9uYpel7vz61TJoFBFo_IwMDbQ"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "success":true,
 *    "email": "client@example.com",
 *    "name": "Adam",
 *    "lastName": "Niezgódka"
 * }
 *
 */
router.post("/activate", validation.activateUser, controller.activateUser);

/**
 * @api {post} /v1/user/security/login Log in user
 * @apiName loginUser
 * @apiDescription Logs in user
 * @apiGroup User
 *
 * @apiParam {String} email Email of the user
 * @apiParam {String} password Password of the user
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *  	"email": "client@example.com",
 *  	"password": "Testy1234"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "success": "true"
 *    "token": "JMyiel9WA6yS0SI5T0zy-Ap5TkgzY9hI1GkkuJxrrv5gWVHQrJ3QI7NprRPOp5hI3ZlNsN-_EyjcOFcVEHxgE7eDiw71Z9O2tb8CnO5VRxHdh9uYpel7vz61TJoFBFo_IwMDbQ",
 *    "user": {
 *      "name": "Adam",
 *   	"lastName": "Niezgódka",
 *		"email": "client@example.com"
 *    }
 * }
 *
 */
router.post("/login", validation.loginUser, controller.loginUser);

/**
 * @api {post} /v1/user/security/validateToken Checks is token valid
 * @apiName validateToken
 * @apiDescription Validates provided token
 * @apiGroup User
 *
 * @apiParam {String} token Token to validate
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *  	"token": "JMyiel9WA6yS0SI5T0zy-Ap5TkgzY9hI1GkkuJxrrv5gWVHQrJ3QI7NprRPOp5hI3ZlNsN-_EyjcOFcVEHxgE7eDiw71Z9O2tb8CnO5VRxHdh9uYpel7vz61TJoFBFo_IwMDbQ",
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "success": "true"
 *  }
 *
 */
router.post("/validateToken", validation.validateToken, controller.validateToken);

router.path = "/user/security";

module.exports = router;
