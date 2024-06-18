import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import UserController from "../controllers/UserController";

const router = Router();

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/users':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get all except loggedin user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: get All Users
 *      500:
 *        description: Server Error
 */
router.get("/", authMiddleware, UserController.getAllUsers);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/users/search':
 *  get:
 *     tags:
 *     - Users
 *     summary: Search users and posts
 *     parameters:
 *          - in: query
 *            name: query
 *            schema:
 *              type: string
 *            required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Server Error
 */
router.get("/search", authMiddleware, UserController.searchUsersPostsAndRecipe);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/users/{id}':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get user by userId
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Server Error
 */
router.get("/:id", authMiddleware, UserController.getUserById);

export default router;
