import express from "express";
import PostController from "../controllers/PostController";
import authMiddleware from "../middlewares/authMiddleware";
import fileUpload from "express-fileupload";
const router = express.Router();

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/posts':
 *  post:
 *     tags:
 *     - Posts
 *     summary: Create a new post
 *     requestBody:
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              postContent:
 *                type: string
 *              images:
 *                type: array
 *                items:
 *                  type: string
 *                  format: binary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      201:
 *        description: Post Created
 *      400:
 *        description: Fields Empty
 *      500:
 *        description: Server Error
 */
router.post("/", authMiddleware, fileUpload(), PostController.create);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/posts':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Get all posts by userId
 *     parameters:
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *          - in: query
 *            name: limit
 *            schema:
 *              type: integer
 *            required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: get All Posts
 *      400:
 *        description: Query Parameters Empty
 *      500:
 *        description: Server Error
 */
router.get("/", authMiddleware, PostController.getAll);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/posts/{postId}/likes':
 *  post:
 *     tags:
 *     - Posts
 *     summary: Like or unlike a post
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: uuid of post
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      201:
 *        description: Liked a Post
 *      200:
 *        description: UnLike a Post
 *      404:
 *        description: Post does not exist
 *      500:
 *        description: Server Error
 */
router.post("/:postId/likes", authMiddleware, PostController.addLikeToPost);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/posts/{postId}/comments':
 *  post:
 *     tags:
 *     - Posts
 *     summary: add a new comment
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - comment
 *            properties:
 *              comment:
 *                type: string
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: uuid of post
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      201:
 *        description: Comment Added Successfully
 *      404:
 *        description: Post does not exist
 *      500:
 *        description: Server Error
 */
router.post("/:postId/comments", authMiddleware, PostController.addComment);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/posts/{postId}/comments':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Get all comments by postId
 *     parameters:
 *          - in: path
 *            name: postId
 *            schema:
 *              type: string
 *            required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: get All Comments
 *      404:
 *        description: Post not Found
 *      400:
 *        description: Query Parameters Empty
 *      500:
 *        description: Server Error
 */
router.get("/:postId/comments", authMiddleware, PostController.getAllComments);

export default router;
