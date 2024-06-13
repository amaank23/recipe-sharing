import { Button, Select } from "antd";
import React, { useEffect } from "react";
import { getAllRecipesApi } from "../../redux/api/Recipe";
import { useDispatch, useSelector } from "react-redux";
import { useToggle } from "./../../utils/hooks/useToggle";
import AddReceipeModal from "./../Receipes/AddReceipeModal";
const RecipeSelect = ({ onPostRecipeChange }) => {
  const [recipeModal, toggle] = useToggle();
  const dispatch = useDispatch();
  const getAllRecipes = useSelector((state) => state.getAllRecipes);
  const addRecipe = useSelector((state) => state.addRecipe);
  useEffect(() => {
    getAllRecipesApi(dispatch);
  }, [addRecipe.data]);
  const recipeOptions = getAllRecipes.data?.data?.map((item) => ({
    label: item.name,
    value: JSON.stringify(item),
  }));
  return (
    <div className="mb-4">
      {recipeModal && <AddReceipeModal open={recipeModal} close={toggle} />}
      <div className="flex items-center justify-between">
        <label htmlFor="recipeSelect">Select Recipe</label>
        <Button type="link" onClick={toggle}>
          Create new recipe
        </Button>
      </div>
      <Select
        className="h-[41px] w-full mt-2"
        id="recipeSelect"
        options={recipeOptions || []}
        onChange={(value) => onPostRecipeChange(value)}
      />
    </div>
  );
};

export default RecipeSelect;
