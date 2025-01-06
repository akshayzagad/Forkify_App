import icons from "url:../img/icons.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";

<<<<<<< HEAD
const recipeContainer = document.querySelector('.recipe');

const controlRecipe = async function () {
  try {

=======
const recipeContainer = document.querySelector(".recipe");

const controlRecipe = async function () {
  try {
>>>>>>> 4ccc08ede114fb149c212f8b41ed04573459d994
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

<<<<<<< HEAD
    
  }
   catch (err) {
=======
  } catch (err) {
>>>>>>> 4ccc08ede114fb149c212f8b41ed04573459d994
    recipeView.handlingError(err);
  }
};

const ControlSearchResults = async function () {
  try {
    /* Render Spinner */
    resultView.renderSpinner();

    /* Get search query from search view and Store it */
    let query = searchView.getQuery();
    if (!query) return;

    /* store query pass in Api and get data  */
    await model.loadSearchResult(query);

     /* Render Preview passing data into Parent class View which come from above api*/
    resultView.render(model.state.searchs.results);

  } catch (error) {
    console.error(error);
  }
};

function init() {
  /** Subskriber Function :- calling addHandlerRender function in recipeView*/
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(ControlSearchResults);
}

<<<<<<< HEAD
/** Subskriber Function :- calling addHandlerRender function in recipeView*/
recipeView.addHandlerRender(controlRecipe);


=======
init();
>>>>>>> 4ccc08ede114fb149c212f8b41ed04573459d994
