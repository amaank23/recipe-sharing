import { getRequest, postRequest } from "../../../utils/baseApi";
import { successMessage } from "../../../utils/message";
import { handleApiErrors } from "../../../utils/util";
import endpoints from "../../endpoints";
import {
  addRecipe,
  addRecipeFailure,
  addRecipeSuccess,
} from "../../slices/Recipe/addRecipeSlice";
import {
  getAllRecipes,
  getAllRecipesFailure,
  getAllRecipesSuccess,
} from "../../slices/Recipe/getAllRecipesSlice";

export async function getAllRecipesApi(
  dispatch,
  pageLimit = { page: 1, limit: 999 }
) {
  try {
    dispatch(getAllRecipes());
    const res = await getRequest(
      `${endpoints.Recipe.getAllRecipes}?page=${pageLimit.page}&limit=${pageLimit.limit}`
    );
    dispatch(getAllRecipesSuccess(res.data));
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(getAllRecipesFailure(error?.response?.data));
  }
}

export async function addRecipeApi(dispatch, body, onSuccess) {
  try {
    dispatch(addRecipe());
    const res = await postRequest(endpoints.Recipe.addRecipe, body);
    dispatch(addRecipeSuccess(res.data));
    successMessage(res?.data?.message);
    onSuccess();
  } catch (error) {
    handleApiErrors(error, dispatch);
    dispatch(addRecipeFailure(error?.response?.data));
  }
}
