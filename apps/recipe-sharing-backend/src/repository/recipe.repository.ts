import { myDataSource } from "../app-data-source";
import Recipe from "../entities/Recipe";

export const RecipeRepository = myDataSource.getRepository(Recipe);
