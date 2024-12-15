export const state = {
    recipe:{},
};

export const loadRecipe = async function (id){
    try {
        //Recipe Api
        const responseApi = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);

        const responseData = await responseApi.json();
        if (!responseApi.ok) throw new Error(`Somthing went wrong in responseApi.status ${response.status},${responseData.message}`);
        // console.log(responseApi);
        // console.log(responseData.data);
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
    } catch (error) {
        alert(err)
    }       
}