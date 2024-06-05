import express, { Request, Response } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import ProfileController from "../controllers/ProfileController";
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
 * '/api/profiles':
 *  post:
 *     tags:
 *     - Profile
 *     summary: Create a User Profile
 *     requestBody:
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              about:
 *                type: string
 *              country:
 *                type: string
 *              city:
 *                type: string
 *              profileImage:
 *                type: string
 *                format: binary
 *              coverImage:
 *                type: string
 *                format: binary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      201:
 *        description: Profile Created
 *      500:
 *        description: Server Error
 */
router.post("/", authMiddleware, fileUpload(), ProfileController.createProfile);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/profiles/{profileId}':
 *  patch:
 *     tags:
 *     - Profile
 *     summary: Update User Profile
 *     parameters:
 *          - in: path
 *            name: profileId
 *            schema:
 *              type: string
 *            required: true
 *     requestBody:
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              about:
 *                type: string
 *              country:
 *                type: string
 *              city:
 *                type: string
 *              profileImage:
 *                type: string
 *                format: binary
 *              coverImage:
 *                type: string
 *                format: binary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Profile Updated
 *      500:
 *        description: Server Error
 */
router.patch(
  "/:profileId",
  authMiddleware,
  fileUpload(),
  ProfileController.updateProfile
);

export default router;
