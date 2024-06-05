import { myDataSource } from "../app-data-source";
import Ingredient from "../entities/Ingredient";

export const IngredientRepository = myDataSource.getRepository(Ingredient);
