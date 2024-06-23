import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import chatController from "../controllers/chatController";

const router = Router();

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/chats':
 *  post:
 *     tags:
 *     - Chats
 *     summary: Create a new chat
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - user1Id
 *              - user2Id
 *            properties:
 *              user1Id:
 *                type: string
 *              user2Id:
 *                type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      201:
 *        description: Chat Created Success
 *      500:
 *        description: Server Error
 */
router.post("/", authMiddleware, chatController.createChat);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/chats/{chatId}/messages':
 *  post:
 *     tags:
 *     - Chats
 *     summary: Create a new message
 *     parameters:
 *          - in: path
 *            name: chatId
 *            schema:
 *              type: string
 *            required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - senderId
 *              - recieverId
 *              - content
 *            properties:
 *              senderId:
 *                type: string
 *              recieverId:
 *                type: string
 *              content:
 *                type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      201:
 *        description: Chat Created Success
 *      500:
 *        description: Server Error
 */
router.post("/:chatId/messages", authMiddleware, chatController.sendMessage);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/chats/{chatId}/messages':
 *  get:
 *     tags:
 *     - Chats
 *     summary: Get chat messages
 *     parameters:
 *          - in: query
 *            name: page
 *            schema:
 *              type: number
 *            required: true
 *          - in: query
 *            name: limit
 *            schema:
 *              type: number
 *            required: true
 *          - in: path
 *            name: chatId
 *            schema:
 *              type: string
 *            required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      201:
 *        description: Chat Created Success
 *      500:
 *        description: Server Error
 */
router.get(
  "/:chatId/messages",
  authMiddleware,
  chatController.getAllChatMessages
);

export default router;
