
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";

const recipeContainer = document.querySelector(".recipe");

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

  } catch (err) {
    recipeView.handlingError(err);
  }
};

const ControlSearchResults = async function () {
  try {
    /* Render Spinner */
    resultView.renderSpinner();

    /* Get search query from search view and Store it */
    let query = searchView.getQuery();
    console.log(query);
    
    if (!query) return;

    /* store query pass in Api and get data  */
    await model.loadSearchResult(query);

     /* Render Preview passing data into Parent class View which come from above api*/
    // resultView.render(model.state.searchs.results);
    resultView.render(model.getSearchResultPage(2));

    /**Render Pagination view */
    paginationView.render(model.state.searchs);

  } catch (error) {
    console.error(error);
  }
};

const ControlPagination = function (gotoPage) {
  // Render new results
  resultView.render(model.getSearchResultPage(gotoPage));
  paginationView.render(model.state.searchs);
};


function init() {
  /** Subskriber Function :- calling addHandlerRender function in recipeView*/
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(ControlSearchResults);
  paginationView.addHandlerClick(ControlPagination);
}

init();
