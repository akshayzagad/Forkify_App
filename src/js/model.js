import { API_URL } from "./config";
import { getJson } from "./helpers";

export const state = {
    recipe:{},
};

export const loadRecipe = async function (id){
    try {
        //Recipe Api
        const responseData = await getJson(`${API_URL}${id}`);
       
        let { recipe } = responseData.data;
        state.recipe =
        {
            cookingTime: recipe.cooking_time,
            id: recipe.id,
            imageurl: recipe.image_url,
            publisher: recipe.publisher,
            servings: recipe.servings,
            sourceurl: recipe.source_url,
            title: recipe.title,
            ingredients: recipe.ingredients,
        };
        console.log(state.recipe);
    } catch (err) {
        // console.error(`${err} It is a error`);
        throw err;
    }       
}

export const searchReasult = async function (query) {
    const responseData = await getJson(`${API_URL}?search=${query}`);
    let { recipe } = responseData.data;
    console.log(responseData);
}

console.log(searchReasult('pizza'));
