import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import recipesController from "../controllers/recipesController";

const router = Router();

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/recipes':
 *  post:
 *     tags:
 *     - Recipes
 *     summary: Create a new recipe
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *              - ingredients
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              ingredients:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *                    quantity:
 *                      type: number
 *                    unit:
 *                      type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      201:
 *        description: Success
 *      500:
 *        description: Server Error
 */
router.post("/", authMiddleware, recipesController.addNewRecipeAndIngredients);

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/recipes':
 *  get:
 *     tags:
 *     - Recipes
 *     summary: Get all recipes by userId
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
 *        description: Success
 *      500:
 *        description: Server Error
 */
router.get("/", authMiddleware, recipesController.getAllRecipes);

export default router;
