
import { API_URL } from "./config";
import { getJson } from "./helpers";

export const state = {
    recipe:{},
    searchs:{
        query:'',
        results:[]
    }
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

<<<<<<< HEAD
export const searchReasult = async function (query) {
    const responseData = await getJson(`${API_URL}?search=${query}`);
    let { recipe } = responseData.data;
    console.log(responseData);
}

console.log(searchReasult('pizza'));
=======
export const  loadSearchResult = async function(query){
try {
    //Recipe Api
    const data = await getJson(`${API_URL}?search=${query}`);
    // console.log(data);
    
    state.searchs.results = data.data.recipes.map((recipe) => {
        return {
            id: recipe.id,
            imageurl: recipe.image_url,
            publisher: recipe.publisher,
            title: recipe.title,
        }
        });
        console.log(state.searchs.results);
        
    } catch (error) {
    console.error(error);
    }
}

loadSearchResult('pizza');
>>>>>>> 4ccc08ede114fb149c212f8b41ed04573459d994
