import icons from 'url:../img/icons.svg'
import 'core-js/stable';
import 'regenerator-runtime/runtime'
import * as model from './model.js'
import recipeView from './views/recipeView.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

const controlRecipe = async function () {
  try {

    /* Get id when click on hasmap using load hasmap event on window  */
    const id = window.location.hash.slice(1);
    if (!id) return;

    /* Loading Recipe */
    await model.loadRecipe(id);

    /* Get import inisilize empty object in controller to use in markup */
    let { recipe } = model.state;
    console.log(recipe);

    /*  Rendering spinner when load the recipe */
    recipeView.renderSpinner();

    /* Here we get data from model by object state which is initiallize above code */
    recipeView.render(model.state.recipe);

    /* Here We use same method to initilize constructor in recipeView */
    //let recipeView = new recipeView(model.state.recipe); 

    
  }
   catch (err) {
    recipeView.handlingError(err);
  }

}

/** Subskriber Function :- calling addHandlerRender function in recipeView*/
recipeView.addHandlerRender(controlRecipe);


