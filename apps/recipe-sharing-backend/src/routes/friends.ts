import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import friendsController from "../controllers/friendsController";

const router = express.Router();

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/friends/request':
 *  post:
 *     tags:
 *     - Friends
 *     summary: Send a Friend Request
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - sender_id
 *              - receiver_id
 *            properties:
 *              sender_id:
 *                type: string
 *              receiver_id:
 *                type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      201:
 *        description: Success
 *      500:
 *        description: Server Error
 */
router.post("/request", authMiddleware, friendsController.sendFriendRequest);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/friends/accept':
 *  patch:
 *     tags:
 *     - Friends
 *     summary: Accept a Friend Request
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - sender_id
 *              - receiver_id
 *            properties:
 *              sender_id:
 *                type: string
 *              receiver_id:
 *                type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Server Error
 */
router.patch("/accept", authMiddleware, friendsController.acceptFriendRequest);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/friends/reject':
 *  patch:
 *     tags:
 *     - Friends
 *     summary: Reject a Friend Request
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - sender_id
 *              - receiver_id
 *            properties:
 *              sender_id:
 *                type: string
 *              receiver_id:
 *                type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Server Error
 */
router.patch("/reject", authMiddleware, friendsController.rejectFriendRequest);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/friends/requests':
 *  get:
 *     tags:
 *     - Friends
 *     summary: get all friends requests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Server Error
 */
router.get("/requests", authMiddleware, friendsController.getAllFriendRequests);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/friends':
 *  get:
 *     tags:
 *     - Friends
 *     summary: get all friends
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Server Error
 */
router.get("/", authMiddleware, friendsController.getAllFriends);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/friends/check/{friendId}':
 *  get:
 *     tags:
 *     - Friends
 *     summary: check if friend exist
 *     parameters:
 *       - in: path
 *         name: friendId
 *         schema:
 *           type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Server Error
 */
router.get("/check/:friendId", authMiddleware, friendsController.checkIfFriend);

export default router;
