import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/error";
import { RecipeRepository } from "../repository/recipe.repository";
import { IngredientRepository } from "../repository/ingredient.repository";
import Ingredient from "../entities/Ingredient";
import { CustomRequest } from "../middlewares/authMiddleware";
import { UserRepository } from "../repository/user.repository";

const addNewRecipeAndIngredients = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, description, ingredients } = req.body;
  const userId = req.user.data.id;
  try {
    const user = await UserRepository.findOne({ where: { id: userId } });
    const newRecipe = RecipeRepository.create();
    newRecipe.name = name;
    newRecipe.description = description;
    newRecipe.user = user;
    const newIngredients: Ingredient[] = ingredients.map((ingredient: any) => {
      const newIngredient = IngredientRepository.create();
      newIngredient.name = ingredient.name;
      newIngredient.quantity = ingredient.quantity;
      newIngredient.unit = ingredient.unit;
      return newIngredient;
    });
    newRecipe.ingredients = newIngredients;
    await RecipeRepository.save(newRecipe);
    res
      .status(201)
      .json({ message: "Recipe Created Successfully!", data: newRecipe });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
};

const getAllRecipes = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query;
  const itemsToSkip = (+page - 1) * +limit;
  const userId = req.user.data.id;
  try {
    const recipes = await RecipeRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: { ingredients: true },
      order: { created_at: "DESC" },
      take: +limit,
      skip: itemsToSkip,
    });
    res
      .status(200)
      .json({ message: "Recipes Retrieved Successfully!", data: recipes });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
};

export default { addNewRecipeAndIngredients, getAllRecipes };
